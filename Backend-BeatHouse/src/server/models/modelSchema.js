let mongoose = require('mongoose')

const productosCollection = 'products'
const productosSchema = new mongoose.Schema({
    name: {type: String, require: true},
    productId: {type: String, require: true},
    price: {type: Number, require: true},
    description: {type: String, require: false},
    brand: {type: String, require: true},
    photoUrl: {type: String, require: true},
    color: {type: String, require: true},
    stock: {type: Number, require: true},
    productCode: {type: String, require: true},
    timeStamp:{type: String, require: true},
})
const products = new mongoose.model(productosCollection, productosSchema)
//----------------------------------------------------------------------------------------------------------
const usuarioCollection = 'users';
const usuariosSchema = new mongoose.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    cart: {type: Array, require: true},
    buyOrders: {type: Array, require: true},
})
const users = new mongoose.model(usuarioCollection, usuariosSchema)
//----------------------------------------------------------------------------------------------------------
const usuarioFacebookCollection = 'usersfacebook'
const usuariosFacebookSchema = new mongoose.Schema({
    username: {type: String, require: true},
    id: {type: String, require: true},
    photo: {type: String, require: true},
    accessToken: {type: String, require:true},
    cart: {type: Array, require: true},
    buyOrders: {type: Array, require: true},
})
const usersfacebook = new mongoose.model(usuarioFacebookCollection, usuariosFacebookSchema); 
//----------------------------------------------------------------------------------------------------------
const carouselItemsCollection = 'carouselItems'
const carouselItemsSchema = new mongoose.Schema({
    title: {type: String, require: false},
    description: {type: String, require: false},
    image: {type: String, require: true},
})
const carouselItems = new mongoose.model(carouselItemsCollection, carouselItemsSchema)
//----------------------------------------------------------------------------------------------------------
module.exports = {products, users, usersfacebook, carouselItems}