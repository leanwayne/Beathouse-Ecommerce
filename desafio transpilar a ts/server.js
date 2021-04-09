"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express = require("express");
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = 8080;
var router = express.Router();
var handlebars = require("express-handlebars");
var path = require("path");
var fs = require("fs");
var isProduct = function (object) {
    return (object.title &&
        typeof object.title === "string" &&
        object.price &&
        typeof object.price === "number" &&
        object.thumbnail &&
        typeof object.thumbnail === "string");
};
app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views/partials"),
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var product = {
    title: "",
    price: "",
    thumbnail: "",
    id: ""
};
var listaProductos = [];
var listaMensajes = [];
// Index------------------------------------------------------------------------------------------------
app.get("/", function (req, res) {
    res.render("index", { products: listaProductos, productsExists: true, hayproductos: listaProductos !== 0, });
});
//guardar product en el array------------------------------------------------------------------------------------------------
router.post("/productos/guardar", function (req, res) {
    if (!req.body.title && !req.body.price && !req.body.thumbnail) {
        return res.status(400).send("Error en los parametros");
    }
    product = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        id: (listaProductos.length + 1).toString(),
    };
    listaProductos.push(product);
    return res.status(200).render("index", {
        products: listaProductos,
        productsExists: true,
        hayproductos: listaProductos !== 0,
    });
});
//get lista de productos entera------------------------------------------------------------------------------------------------
router.get("/productos", function (req, res) {
    if (listaProductos.length === 0) {
        return res.status(400).send("Error en los parametros");
    }
    res.json(listaProductos);
});
//get producto por id------------------------------------------------------------------------------------------------
router.get("/productos/:id", function (req, res) {
    var producto = listaProductos.find(function (product) { return product.id === req.params.id; });
    if (!producto) {
        return res.status(400).send({ error: "producto no encontrado" });
    }
    return res.status(200).json(producto);
});
//cambiar producto por id------------------------------------------------------------------------------------------------
router.put("/productos/:id", function (req, res) {
    if (!isProduct(req.body)) {
        return res.status(400).send("Error en los parametros");
    }
    var producto = listaProductos.find(function (product) { return product.id === req.params.id; });
    if (!producto) {
        return res.status(400).send("No existe un producto con ese id");
    }
    var arrActualizado = listaProductos.filter(function (product) { return product.id !== producto.id; });
    req.body.id = producto.id;
    arrActualizado.push(req.body);
    listaProductos = arrActualizado;
    return res.status(200).send(listaProductos);
});
//borra producto por id------------------------------------------------------------------------------------------------
router.delete("/productos/:id", function (req, res) {
    var producto = listaProductos.find(function (product) { return product.id === req.params.id; });
    if (!producto) {
        return res.status(400).send("No existe un producto con ese id");
    }
    var arrActualizado = listaProductos.filter(function (product) { return product.id !== producto.id; });
    listaProductos = arrActualizado;
    return res.status(200).send(listaProductos);
});
app.use("/api", router);
//logica del socket-------------------------------------------------------------------------------------------------------------------------------------
io.on("connection", function (socket) {
    socket.on("productos", function (producto) {
        io.emit("productos", producto);
        var newProducto = {
            title: producto.title,
            price: producto.price,
            thumbnail: producto.thumbnail,
            id: (listaProductos.length + 1).toString(),
        };
        listaProductos.push(newProducto);
        console.log(newProducto);
    });
    socket.on("client-mensaje", function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var messageFile, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    io.emit("server-mensaje", message);
                    messageFile = {
                        email: message.email,
                        timestamp: message.timestamp,
                        mensaje: message.mensaje,
                    };
                    listaMensajes.push(messageFile);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs.promises.writeFile("messages.txt", JSON.stringify(listaMensajes))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log("Error de escritura", err_1.error);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
//servidor ----------------------------------------------------------------------------------------------------------------------------------------------
var server = http.listen(port, function () {
    console.log("Servidor inicializado en puerto " + server.address().port);
});
server.on("error", function (error) { return console.log("Error en el servidor " + error); });
