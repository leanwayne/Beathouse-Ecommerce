const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const router = express.Router();
const path = require("path");
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
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views/partials"),
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let product = {
  title: "",
  price: "",
  thumbnail: "",
};
let listaProductos = [];

//form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//guardar product en el array
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
  return res
    .status(200)
    .render("main", {
      data: listaProductos,
      atr: true,
      existe: listaProductos.length !== 0,
    });
});
//get lista de productos entera
router.get("/productos", (req, res) => {
  res.render("main", {
    data: listaProductos,
    atr: true,
    existe: listaProductos.length !== 0,
  });
});
//get producto por id
router.get("/productos/:id", (req, res) => {
  const producto = listaProductos.find(
    (product) => product.id === req.params.id
  );
  if (!producto) {
    return res.status(400).send({ error: "producto no encontrado" });
  }
  return res.status(200).json(producto);
});
//cambiar producto por id
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
//borra producto por id
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
const server = app.listen(8080, () => {
  console.log("Running");
});
server.on("error", (error) => console.log("Error en el servidor" + error));
