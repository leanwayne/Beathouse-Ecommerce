const express = require('express')
const multer = require ("multer") 
const app = express();
const router = express.Router()

const isProduct = (object)=>{
  return object.title && typeof object.title === "string"  
  && object.price && typeof object.price === "number" 
  && object.thumbnail;
}
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  }, 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
let upload = multer({ storage: storage })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let product = {
  title: '',
  price: '',
  thumbnail: ''
};
let listaProductos = [];

//form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})





//guardar product en el array
router.post("/productos", upload.single('thumbnail'), (req, res, next) => {
  const file = req.file
  if(!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
  }
  if(!req.body.title && !req.body.price && !req.body.thumbnail) {
    return res.status(400).send("Error en los parametros");
  }
  product = { 
    title: req.body.title,
    price: req.body.price,
    thumbnail: file.originalname,
    id: (listaProductos.length + 1).toString()
  };
  listaProductos.push(product);
  return res.status(200).send(listaProductos);
});







//get lista de productos entera
router.get("/productos", (req, res) => {
  if (listaProductos.length === 0) {
    return res.status(404).send({ error: "no hay productos cargados" });
  }
  res.status(200).send(listaProductos);
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
//borra producto por id
router.delete("/productos/:id", (req, res) => {
  const producto = listaProductos.find(product => product.id === req.params.id)
  if (!producto) {
    return res.status(400).send("No existe un producto con ese id");
  }
  const arrActualizado = listaProductos.filter((product) => product.id !== producto.id)
  listaProductos = arrActualizado
  return res.status(200).send(listaProductos);
});



app.use('/api', router)
const server = app.listen(8080, () => { 
  console.log("Running");
});
server.on("error", (error) => console.log("Error en el servidor" + error));