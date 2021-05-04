let mongoose = require('mongoose');

const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    nombre: {type: String, require: true},
    precio: {type: Number, require: true},
    descripcion: {type: String, require: false},
    foto: {type: String, require: true},
    stock: {type: Number, require: true},
    codigo: {type: String, require: true},
    timestamp:{type: String, require: true},
    id:{type: String, require: true}
});
const productos = new mongoose.model(productosCollection, productosSchema); 

const mensajesCollection = 'mensajes';

const mensajesSchema = new mongoose.Schema({
    email: {type: String, require: true},
    timestamp: {type: String, require: true},
    mensaje: {type: String, require: true},
});
const mensajes = new mongoose.model(mensajesCollection, mensajesSchema); 

module.exports = {productos, mensajes,}