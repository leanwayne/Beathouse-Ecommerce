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
//----------------------------------------------------------------------------------------------------------
const mensajesCollection = 'mensajes';

const mensajesSchema = new mongoose.Schema({
    email: {type: String, require: true},
    timestamp: {type: String, require: true},
    mensaje: {type: String, require: true},
});
const mensajes = new mongoose.model(mensajesCollection, mensajesSchema); 
//----------------------------------------------------------------------------------------------------------
const usuarioCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    provider: {type: String, require: false},
    facebook: {type: Object, require: false}
});
const usuarios = new mongoose.model(usuarioCollection, usuariosSchema); 
//----------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------
const usuarioFacebookCollection = 'usuariosfacebook';

const usuariosFacebookSchema = new mongoose.Schema({
    username: {type: String, require: true},
    id: {type: String, require: true},
    photo: {type: String, require: true},
    accessToken: {type: String, require:true},
});
const usuariosfacebook = new mongoose.model(usuarioFacebookCollection, usuariosFacebookSchema); 
//----------------------------------------------------------------------------------------------------------



module.exports = {productos, mensajes, usuarios,usuariosfacebook}