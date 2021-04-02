const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 8080
const router = express.Router();
const handlebars = require("express-handlebars");
const path = require("path");

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views/partials")
}));
app.set('view engine', 'hbs')
app.set("views", path.join(__dirname, "views"));
app.set(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
let listaProductos = [];

// Index
app.get('/', (req, res) => {
    res.render('index', {products: listaProductos, productsExists: true, hayproductos: listaProductos !== 0});
})

app.use('/api', router)

io.on('connection', (socket) => {
    socket.on('productos', (producto) => {
      io.emit('productos', producto);
      newProducto = {
          title: producto.title,
          price: producto.price, 
          thumbnail: producto.thumbnail,
          id: listaProductos.length + 1
      };
      listaProductos.push(newProducto)
      console.log(newProducto);
    });
})

const server = http.listen(port, () => {
    console.log(`Servidor inicializado en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))