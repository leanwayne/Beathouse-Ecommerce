const express = require("express");
const app = require('express')();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 8080
const router = express.Router();
const handlebars = require("express-handlebars");
const path = require("path");
const fs = require('fs');

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
let listaMensajes = []

// Index
app.get('/', (req, res) => {
    res.render('index', {products: listaProductos, productsExists: true, hayproductos: listaProductos !== 0});
})

app.use('/api', router)

io.on('connection', (socket) => {
    socket.on('productos', (producto) => {
      io.emit('productos', producto);
      let newProducto = {
          title: producto.title, 
          price: producto.price, 
          thumbnail: producto.thumbnail,
          id: listaProductos.length + 1
      };
      listaProductos.push(newProducto)
      console.log(newProducto);
    });

    socket.on('client-mensaje', async (message) => {
        io.emit('server-mensaje', message)
        let messageFile = {
            email: message.email,
            timestamp: message.timestamp,
            mensaje: message.mensaje
        }
        listaMensajes.push(messageFile)
        try {
			await fs.promises.writeFile('messages.txt', JSON.stringify(listaMensajes))
		} catch(err) {
			console.log('Error de escritura', err.error)
		}
    })
})

const server = http.listen(port, () => {
    console.log(`Servidor inicializado en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))