const express = require('express')
const multer = require ("multer") 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static',express.static('static'))

const router = express.Router()
app.use('/api', router)
let listaProductos = [];



const isProduct = (object)=>{
  return object.title && typeof object.title === "string"  
  && object.price && typeof object.price === "number" 
  && object.title && typeof object.title === "string";
}

router.get('/',(req, res) =>{
  res.sendFile('/index.html')
})

router.post("/productos", (req, res) => {
  if(!isProduct(req.body)) {
    return res.status(400).send("Error en los parametros");
  }
  req.body.id = (listaProductos.length + 1).toString();
  listaProductos.push(req.body);
  return res.status(200).send(listaProductos);
});

router.get("/productos", (req, res) => {
  if (listaProductos.length === 0) {
    return res.status(404).send({ error: "no hay productos cargados" });
  }
  res.status(200).send(listaProductos);
});

router.get("/productos/:id", (req, res) => {
  const producto = listaProductos.find(
    (product) => product.id === req.params.id
  );
  if (!producto) {
    return res.status(400).send({ error: "producto no encontrado" });
  }
  return res.status(200).json(producto);
});

router.put("/productos/:id", (req, res) => {
  if(!isProduct(req.body)) {
    return res.status(400).send("Error en los parametros");
  }
  const producto = listaProductos.find(product => product.id === req.params.id)
  if (!producto) {
    return res.status(400).send("No existe un producto con ese id");
  }
  const arrActualizado = listaProductos.filter((product) => product.id !== producto.id)
  req.body.id = producto.id
  arrActualizado.push(req.body);
  listaProductos = arrActualizado
  return res.status(200).send(listaProductos);
});

router.delete("/productos/:id", (req, res) => {
  const producto = listaProductos.find(product => product.id === req.params.id)
  if (!producto) {
    return res.status(400).send("No existe un producto con ese id");
  }
  const arrActualizado = listaProductos.filter((product) => product.id !== producto.id)
  listaProductos = arrActualizado
  return res.status(200).send(listaProductos);
});

const server = app.listen(8080, () => { 
  console.log("Running");
});
server.on("error", (error) => console.log("Error en el servidor" + error));