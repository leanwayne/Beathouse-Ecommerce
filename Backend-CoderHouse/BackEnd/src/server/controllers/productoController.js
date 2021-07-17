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
       descripcion: req.body.descripcion || "sin descripcion",
       marca: req.body.marca || "sin marca",
       precio: req.body.precio,
       fotoUrl: req.body.fotoUrl || "sin foto",
       color: req.body.color,
       stock: req.body.stock,
       codigoP: req.body.codigoP || "sin codigo",
       timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
     };

    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){  
     // const respuesta = await model.productos.find({}).sort({nombre: 1});
     // product.id = (respuesta.length + 1).toString()
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
      try {
        respuesta = await model.productos.find({}).sort({nombre: 1}); //MongoDB-----
        console.log("lista productos de Mongo:", respuesta)      
        res.status(200).json(respuesta);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  },

  obtenerProductoPorId: async (req, res) => {
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){
      try {
        const respuesta = await model.productos.find({
          $or:[{nombre: req.query.nombre},{_id: req.query.id}]
        });
        console.log("la respuesta producto encontrado", respuesta)
        if(respuesta.length === 0)return res.status(400).send("no hay productos con los parametros indicados");
        return res.status(200).json(respuesta);
      } catch (error) {
        return res.status(400).send(error);
      }
    }  
  },

  actualizarProductoPorId: async (req, res) => {
    let productOriginal
    try {
      productOriginal = await model.productos.find({
        $or:[{_id: req.query.id}]
      }); 
    } catch (error) {
      return res.status(400).send("Id incorrecto")
    }
    let product = {
      nombre: req.body.nombre || productOriginal[0].nombre,
      descripcion: req.body.descripcion || productOriginal[0].descripcion,
      marca: req.body.marca || productOriginal[0].marca,
      precio: req.body.precio || productOriginal[0].precio,
      fotoUrl: req.body.fotoUrl || productOriginal[0].fotoUrl,
      color: req.body.color || productOriginal[0].color,
      stock: req.body.stock || productOriginal[0].stock,
      codigoP: req.body.codigoP || productOriginal[0].codigoP,
      timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
    };
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){
      try {
        resultado1 = await model.productos.updateOne({ _id: req.query.id }, { $set: product })
        console.log("producto actualizado de Mongo:", resultado1)   
        return res.status(200).json(product)
      } catch (error) {
        console.log("no se pudo actualizar el producto", error)
        return res.status(400).send(error)
      }
    }  
  },

  borrarProductoPorId: async (req, res) => {
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){
      try {
        resultado = await model.productos.deleteOne({_id: req.query.id});//MongoDB- ----
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
      object.fotoUrl &&
      typeof object.fotoUrl === "string"
    );
  };