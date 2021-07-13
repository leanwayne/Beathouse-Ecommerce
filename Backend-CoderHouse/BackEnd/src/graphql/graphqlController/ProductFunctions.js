const model = require("../../server/models/modelSchema")
let moment = require("moment");

const isProduct = (nombre, precio, fotoUrl) => {
  return (
    nombre &&
    typeof nombre === "string" &&
    precio &&
    fotoUrl &&
    typeof fotoUrl === "string"
  );
},
 
  addProduct = async function( {nombre, descripcion, marca, precio, fotoUrl, color, stock, codigoP} ){
    if (!isProduct(nombre, precio, fotoUrl)) {
      return "Error en los parametros"
    }
    let product = {
      nombre: nombre,
      descripcion: descripcion || "sin descripcion",
      marca: marca || "sin marca",
      precio: precio,
      fotoUrl: fotoUrl || "sin foto",
      color: color || "sin especificar",
      stock: stock,
      codigoP: codigoP || "sin codigo",
      timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
    };
     try {
       model.productos.insertMany(product)//MongoDB--
       console.log("producto agregado a mongoDB")
       return product;
     } catch (error) {
       console.log("no se pudo agregar el producto")
       return error; 
     }   
  },

  getProducts = async function ()  {
    let products = undefined
    try {
      products = await model.productos.find({}).sort({nombre: 1}); //MongoDB-----
        console.log("lista productos de Mongo:", products)  
        return products  
    } catch (error) {
        console.log(error)
        return error
    } 
  } 

  module.exports = { addProduct, getProducts, }
