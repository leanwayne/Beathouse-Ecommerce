let moment = require("moment");
const model = require("../models/modelSchema")
const { getFakeProducts } = require("../../utils/fakerMock/productoFaker")



module.exports = {
   agregarProducto: async (req, res) => {
     if (!isProduct(req.body)) {
       return res.status(400).send("Error en los parametros");
     }
     let product = {
       nombre: req.body.nombre,
       precio: req.body.precio,
       descripcion: req.body.descripcion || "sin descripcion",
       codigo: moment().format("DD/MM/YYYY HH:MM:SS"),
       foto: req.body.foto,
       stock: req.body.stock,
       timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
     };

    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){  
      const respuesta = await model.productos.find({}).sort({nombre: 1});
      product.id = (respuesta.length + 1).toString()
      try {
        model.productos.insertMany(product)//MongoDB--
        console.log("producto agregado a mongoDB")
        return res.status(200).json(product);
      } catch (error) {
        console.log("no se pudo agregar el producto")
        return res.status(400).send(error);
      } 
    }
  },

  listarProductos: async (req, res) => {
    let respuesta = undefined
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){ 
      respuesta = await model.productos.find({}).sort({nombre: 1}); //MongoDB-----
      console.log("lista productos de Mongo:", respuesta)
    }
    const respuestaid = await model.productos.find({});
    console.log("RESPUESTAID",respuestaid)
    res.status(200).json(respuesta);
  },

  obtenerProductoPorId: async (req, res) => {
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){
      try {
        const respuesta = await model.productos.find({id: req.query.id}); //MongoDB-----
        return res.status(200).json(respuesta);
      } catch (error) {
        return res.status(400).send(error);
      }
    }  
  },

  actualizarProductoPorId: async (req, res) => {
    if (!isProduct(req.body)) {
      return res.status(400).send("Error en los parametros");
    }
    let product = {
      nombre: req.body.nombre,
      precio: req.body.precio,
      descripcion: req.body.descripcion || "sin descripcion",
      codigo: moment().format("DD/MM/YYYY HH:MM:SS"),
      foto: req.body.foto,
      stock: req.body.stock,
      timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
      id: req.params.id
    };
    let supercart = []
      supercart.push(product)
    
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){
      try {
        resultado = await model.productos.updateOne({ id: req.query.id }, { $set: product });//MongoDB---
        console.log("producto actualizado de Mongo:", resultado)   
        return res.status(200).json(resultado)
      } catch (error) {
        console.log("no se pudo actualizar el producto", error)
        return res.status(400).send(error)
      }
    }  
  },

  borrarProductoPorId: async (req, res) => {
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){
      try {
        resultado = await model.productos.deleteOne({id: req.query.id});//MongoDB- ----
        console.log("producto borrado de Mongo:", resultado)  
        return res.status(200).json(resultado);
      } catch (error) {
        console.log("el producto no pudo ser borrado :(",error)
        return res.status(400).send(error);
      }
    }
  },
  
  listarMockFaker: async (req, res) => {
    let cant = req.query.cant || 10;
    let productos = []
    if(cant == 0){
      res.status(400).send({error: "no hay productos"})
    }else{
      for (let i = 0; i < cant; i++) {
        let producto = getFakeProducts()
        productos.push(producto)
      }
      return res.status(200).send(productos)
    }
  }
}

const isProduct = (object) => {
    return (
      object.nombre &&
      typeof object.nombre === "string" &&
      object.precio &&
      object.foto &&
      typeof object.foto === "string"
    );
  };