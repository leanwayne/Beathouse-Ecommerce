const express = require("express");
const router = express.Router();
let moment = require("moment");
const fs = require("fs");
const contenido = fs.readFileSync("productos.txt", "utf-8");
let listaProductos = JSON.parse(contenido);
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
var administrador = true;

//guardar product en el array---------------------------------------------------------------------------------------------------------------------
router.post("/agregar", (req, res) => {
  if (!req.body.nombre && !req.body.precio && !req.body.foto) {
    return res.status(400).send("Error en los parametros");
  }
  let product = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion || "sin descripcion",
    codigo: moment().format("DD/MM/YYYY HH:MM:SS"),
    foto: req.body.foto,
    stock: 20,
    timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
    id: (listaProductos.length + 1).toString(),
  };
  listaProductos.push(product);
  let file = JSON.stringify(listaProductos);
  fs.writeFileSync("./productos.txt", file);
  return res.status(200).json(listaProductos);
});

//get lista de productos entera--------------------------------------------------------------------------------------------------------------------
router.get("/listar", (req, res) => {
  res.status(200).json(listaProductos);
});

//get producto por id---------------------------------------------------------------------------------------------------------------------------
router.get("/listar/:id", (req, res) => {
  const producto = listaProductos.find(
    (product) => product.id === req.params.id
  );
  if (!producto) {
    return res.status(400).send({ error: "producto no encontrado" });
  }
  return res.status(200).json(producto);
});

//cambiar producto por id--------------------------------------------------------------------------------------------------------------------------
router.put("/actualizar/:id", verificar, (req, res) => {
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
  let file = JSON.stringify(listaProductos);
  fs.writeFileSync("./productos.txt", file);

  return res.status(200).json(listaProductos);
});

//borra producto por id-------------------------------------------------------------------------------------------------------------------------
router.delete("/borrar/:id", verificar, (req, res) => {
  const producto = listaProductos.find(
    (product) => product.id === req.params.id
  );
  if (!producto) {
    return res.status(400).send("No existe un producto con ese id");
  }
  let arrActualizado = listaProductos.filter(
    (product) => product.id !== producto.id
  );
  listaProductos = arrActualizado;
  let file = JSON.stringify(listaProductos);
  fs.writeFileSync("./productos.txt", file);
  return res.status(200).send(listaProductos);
});

function verificar(req, res, next) {
  if (!administrador) {
    res.json({ error: "Acceso denegado, usted no es un administrador" });
  } else {
    next();
  }
}

module.exports = router;
