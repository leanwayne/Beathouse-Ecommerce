const express = require("express");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 8080;
const router = express.Router();
const handlebars = require("express-handlebars");
const path = require("path");
const fs = require("fs");
const isProduct = (object) => {
    return (
        object.title &&
        typeof object.title === "string" &&
        object.price &&
        typeof object.price === "number" &&
        object.thumbnail &&
        typeof object.thumbnail === "string"
        );
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

interface Product {
    title: string,
    price: string,
    thumbnail: string,
    id: string,
}
interface Message {
    email: string, 
    timestamp: string, 
    mensaje: string, 
  }

let product: Product = {
    title: "",
    price: "",
    thumbnail: "",
    id:""
};
    
    
let listaProductos:Array<Product> = [];
let listaMensajes:Array<Message> = [];

// Index------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.render("index", {products: listaProductos, productsExists: true, hayproductos: listaProductos !== 0,});
});
//guardar product en el array------------------------------------------------------------------------------------------------
router.post("/productos/guardar", (req, res) => {
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
router.get("/productos", (req, res) => {
    if (listaProductos.length === 0) {
        return res.status(400).send("Error en los parametros");
    }
    res.json(listaProductos)
});
//get producto por id------------------------------------------------------------------------------------------------
router.get("/productos/:id", (req, res) => {
  const producto = listaProductos.find(
    (product) => product.id === req.params.id
  );
  if (!producto) {
    return res.status(400).send({ error: "producto no encontrado" });
  }
  return res.status(200).json(producto);
});
//cambiar producto por id------------------------------------------------------------------------------------------------
router.put("/productos/:id", (req, res) => {
  if (!isProduct(req.body)) {
    return res.status(400).send("Error en los parametros");
  }
  const producto = listaProductos.find(
    (product) => product.id === req.params.id
  );
  if (!producto) {
    return res.status(400).send("No existe un producto con ese id");
  }
  const arrActualizado = listaProductos.filter(
    (product) => product.id !== producto.id
  );
  req.body.id = producto.id;
  arrActualizado.push(req.body);
  listaProductos = arrActualizado;
  return res.status(200).send(listaProductos);
});
//borra producto por id------------------------------------------------------------------------------------------------
router.delete("/productos/:id", (req, res) => {
  const producto = listaProductos.find(
    (product) => product.id === req.params.id
  );
  if (!producto) {
    return res.status(400).send("No existe un producto con ese id");
  }
  const arrActualizado = listaProductos.filter(
    (product) => product.id !== producto.id
  );
  listaProductos = arrActualizado;
  return res.status(200).send(listaProductos);
});

app.use("/api", router);
//logica del socket-------------------------------------------------------------------------------------------------------------------------------------
io.on("connection", (socket) => {
  socket.on("productos", (producto: Product) => {
    io.emit("productos", producto);
    let newProducto: Product = {
      title: producto.title,
      price: producto.price,
      thumbnail: producto.thumbnail,
      id: (listaProductos.length + 1).toString(),
    };
    listaProductos.push(newProducto);
    console.log(newProducto);
  });

  socket.on("client-mensaje", async (message) => {
    io.emit("server-mensaje", message);
    let messageFile: Message = {
      email: message.email,
      timestamp: message.timestamp,
      mensaje: message.mensaje,
    };
    listaMensajes.push(messageFile);
    try {
      await fs.promises.writeFile(
        "messages.txt",
        JSON.stringify(listaMensajes)
      );
    } catch (err) {
      console.log("Error de escritura", err.error);
    }
  });
});
//servidor ----------------------------------------------------------------------------------------------------------------------------------------------
const server = http.listen(port, () => {
  console.log(`Servidor inicializado en puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en el servidor ${error}`));