const fs = require("fs");
let moment = require("moment");
const model = require("../models/modelSchema")
const {productosDB} = require("../optionsSqLite/sqLiteOptions");
const knex = require("knex")(productosDB)
const { getFakeProducts } = require("../fakerMock/productoFaker")
if(process.env.db === "SqLite"){  
  knex.schema.hasTable('productos').then(exists =>{
    if (!exists) {
      return knex.schema.createTable('productos', table => {
        table.increments('id')
        table.string('nombre', 100);
        table.string('descripcion');
        table.float("precio", 10, 2);
        table.string('foto');
        table.integer("stock");
        table.string('codigo');
        table.string('timestamp');  
      });
    }else{
      console.log("Trabajando con DB productos") 
    }
  })
}
module.exports = {
   agregarProducto: async (req, res) => {
    let fileSystem = undefined
    let listaProductos = []
     if (!req.body.nombre && !req.body.precio && !req.body.foto) {
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
    if(process.env.db === "fileSystem"){
      fileSystem = fs.readFileSync("productos.txt", "utf-8");
      listaProductos = JSON.parse(fileSystem);
      product.id = (listaProductos.length + 1).toString()
      listaProductos.push(product);
      let file = JSON.stringify(listaProductos);
      fs.writeFileSync("./productos.txt", file); 
    }
    //SqLite----------------------------------------------------------------------------------------
    if(process.env.db === "SqLite"){   
    knex("productos").insert(product)
    .then( () => {console.log("PRODUCTOS insertados")})
    .catch( e => {console.log(e); throw e;})
    }
    //SqLite----------------------------------------------------------------------------------------
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){  
      const respuesta = await model.productos.find({}).sort({nombre: 1});
      product.id =  (respuesta.length + 1).toString()
      try {
        model.productos.insertMany(product)//MongoDB--
        console.log("producto agregado a mongoDB")
      } catch (error) {
        console.log("no se pudo agregar el producto")
      } 
    }
    return res.status(200).json(listaProductos);
  },

  listarProductos: async (req, res) => {
    let fileSystem = undefined
    let listaProductos = []
    console.log("listarproductos =", listaProductos)
    if(process.env.db === "fileSystem"){
      fileSystem = fs.readFileSync("productos.txt", "utf-8");
      listaProductos = JSON.parse(fileSystem);
    }  
    console.log("listarproductos =", listaProductos)
//SqLite----------------------------------------------------------------------------------------
    if(process.env.db === "SqLite"){  
      knex.from("productos").select("*")
      .then( rows => {
          for (row of rows) {
              console.log(` ${row["id"]} --- ${row["nombre"]}`);
          };
      })
      .catch( e => { console.log(e); throw e;})
    }
//SqLite---------------------------------------------------------------------------------------- 
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){ 
      const respuesta = await model.productos.find({}).sort({nombre: 1}); //MongoDB-----
      console.log("lista productos de Mongo:", respuesta)
    }
    res.status(200).json(listaProductos);
  },

  obtenerProductoPorId: async (req, res) => {
    let fileSystem = undefined
    let listaProductos = []
    let producto = undefined
    if(process.env.db === "fileSystem"){
      fileSystem = fs.readFileSync("productos.txt", "utf-8");
      listaProductos = JSON.parse(fileSystem);
      producto = listaProductos.find(
        (product) => product.id === req.params.id
      );
      if (!producto) {
        return res.status(400).send({ error: "producto no encontrado" });
      }
    }
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){
      try {
        const respuesta = await model.productos.find({id:req.params.id}); //MongoDB-----
        console.log("producto de Mongo:", respuesta)
      } catch (error) {
        console.log("producto no encontrado") 
      }
    }  
    return res.status(200).json(producto);
  },

  actualizarProductoPorId: async (req, res) => {
    let fileSystem = undefined
    let listaProductos = []
    let producto = undefined
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
    if(process.env.db === "fileSystem"){
      fileSystem = fs.readFileSync("productos.txt", "utf-8");
      listaProductos = JSON.parse(fileSystem);
      producto = listaProductos.find(
        (product) => product.id === req.params.id
      );
      if (!producto) {
        return res.status(400).send("No existe un producto con ese id");
      }
      const arrActualizado = listaProductos.filter(
        (product) => product.id !== producto.id
      );
      arrActualizado.push(product);
      listaProductos = arrActualizado;
      let file = JSON.stringify(listaProductos);
      fs.writeFileSync("./productos.txt", file);
    }  
    //SqLite----------------------------------------------------------------------------------------
    if(process.env.db === "SqLite"){
      console.log("en la ruta")
      knex.from("productos").where("id", "=", req.params.id)
      .update({
          nombre: req.body.nombre,
          descripcion:req.body.descripcion || "sin descripcion",
          precio: req.body.precio,
          foto: req.body.foto,
          stock: req.body.stock,
          codigo:  moment().format("DD/MM/YYYY HH:MM:SS"),
          timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
      })
      .then( () => { console.log("Table updated")})
      .catch( (e) => { console.log(e); throw e})
    }  
    //SqLite----------------------------------------------------------------------------------------
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){
      try {
        resultado = await model.productos.updateOne({ id: req.params.id }, { $set: product });//MongoDB---
        console.log("producto actualizado de Mongo:", resultado)  
      } catch (error) {
        console.log("no se pudo actualizar el producto", error)
      }
    }  
    return res.status(200).json(listaProductos);
  },

  borrarProductoPorId: async (req, res) => {
    let fileSystem = undefined
    let listaProductos = []
    let producto = undefined
    if(process.env.db === "fileSystem"){
      fileSystem = fs.readFileSync("productos.txt", "utf-8");
      listaProductos = JSON.parse(fileSystem);
      producto = listaProductos.find(
        (product) => product.id === req.params.id
      );
      if (!producto) {
        return res.status(400).send("No existe un producto con ese id");
      }
      let arrActualizado = listaProductos.filter(
        (product) => product.id !== producto.id
      );
      listaProductos = arrActualizado;
      let file = JSON.stringify(listaProductos);
      fs.writeFileSync("./productos.txt", file);
    }  
    //SqLite----------------------------------------------------------------------------------------
    if(process.env.db === "SqLite"){
      knex.from("productos").where("id", "=", req.params.id).del()
      .then( () => {console.log("deleted")})
      .catch( e => {console.log(e); throw e;})
    }
    //SqLite----------------------------------------------------------------------------------------
    if(process.env.db === "MongoDb" || process.env.db === "MongoAtlas" ){
      try {
        resultado = await model.productos.deleteOne({id: req.params.id});//MongoDB- ----
        console.log("producto borrado de Mongo:", resultado)  
      } catch (error) {
        console.log("el producto no pudo ser borrado :(",error)
      }
    }
    return res.status(200).send(listaProductos);
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