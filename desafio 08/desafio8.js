import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let listaProductos = [];

app.post("/api/productos/guardar", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Error en los parametros");
  }
  req.body.id = (listaProductos.length + 1).toString()
  listaProductos.push(req.body);
  res.status(200).send(listaProductos);
});

app.get("/api/productos/listar", (req, res) => {
  if (listaProductos.length === 0) {
    return res.status(404).send({ error: "no hay productos cargados" });
  }
  res.status(200).send(listaProductos);
});

app.get("/api/productos/listar/:id", (req, res) => {
  const producto = listaProductos.find(product => product.id === req.params.id);
  if (!producto) {
       return res.status(400).send({error:"producto no encontrado"});
  }
  return res.status(200).json(producto);




  //if (listaProductos.find((product) => {product.id !== id})
  //) {
    //return res.status(404).json({ error: "producto no encontrado" });
 // }
 // res.status(200).send(listaProductos.find((product) => {product.id === id}));
});

const server = app.listen(8080, () => {
  console.log("Running");
});
server.on("error", (error) => console.log("Error en el servidor" + error));
