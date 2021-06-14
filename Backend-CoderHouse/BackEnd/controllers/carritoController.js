const fs = require("fs");
const moment = require("moment");

module.exports = {
    agregarId: (req, res) => {
        const contenidoP = fs.readFileSync("productos.txt", "utf-8");
        const listaProductos = JSON.parse(contenidoP);
        const contenidoC = fs.readFileSync("carrito.txt", "utf-8");
        const listaCarrito = JSON.parse(contenidoC);
        const producto = listaProductos.find( (product) => product.id === req.params.id);
        if (!producto) {
          return res.status(400).send({ error: "producto no encontrado" });
        }
        const productCart = {
          id: (listaCarrito.length + 1).toString(),
          timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
          producto: {
            nombre: producto.nombre,
            precio: producto.precio,
            descripcion: producto.descripcion || "sin descripcion",
            codigo: producto.codigo,
            foto: producto.foto,
            stock: producto.stock,
            timestamp: producto.timestamp,
            id: producto.id,
          },
        };
        listaCarrito.push(productCart);
        const file = JSON.stringify(listaCarrito);
        fs.writeFileSync("./carrito.txt", file);
        return res.status(200).json(listaCarrito);
    },

    listarProductos: (req, res) => {
        const contenidoC = fs.readFileSync("carrito.txt", "utf-8");
        const listaCarrito = JSON.parse(contenidoC);
        res.status(200).json(listaCarrito);
    },

    obtenerProductosPorId: (req, res) => {
        const contenidoC = fs.readFileSync("carrito.txt", "utf-8");
        const listaCarrito = JSON.parse(contenidoC);
        const producto = listaCarrito.find((product) => product.id === req.params.id);
        if (!producto) {
          return res.status(400).send({ error: "producto no encontrado" });
        }
        return res.status(200).json(producto);
    },

    borrarProductoPorId: (req, res) => {
        const contenidoC = fs.readFileSync("carrito.txt", "utf-8");
        const listaCarrito = JSON.parse(contenidoC);
        const producto = listaCarrito.find((product) => product.id === req.params.id);
        if (!producto) {
            return res.status(400).send("No existe un producto con ese id");
        }
        const arrActualizado = listaCarrito.filter(
            (product) => product.id !== producto.id
        );
        listaCarrito = arrActualizado;
        const file = JSON.stringify(listaCarrito);
        fs.writeFileSync("./productos.txt", file);
        return res.status(200).json(listaCarrito);
    }
}