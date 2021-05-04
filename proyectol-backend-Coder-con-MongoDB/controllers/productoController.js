const fs = require("fs");
let moment = require("moment");
const model = require("../models/modelSchema")
const {productosDB} = require("../optionsSqLite/sqLiteOptions");
const knex = require("knex")(productosDB)

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

module.exports = {
   agregarProducto: (req, res) => {
    const contenido = fs.readFileSync("productos.txt", "utf-8");
    let listaProductos = JSON.parse(contenido);
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
      id: (listaProductos.length + 1).toString(),
    };
    listaProductos.push(product);
    let file = JSON.stringify(listaProductos);
    fs.writeFileSync("./productos.txt", file); //fileSystem--
    //SqLite----------------------------------------------------------------------------------------
    let producto = [
      { nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion:req.body.descripcion || "sin descripcion",
        foto: req.body.foto,
        stock: req.body.stock,
        codigo:  moment().format("DD/MM/YYYY HH:MM:SS"),
        timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
      }    
    ]
    console.log("producto", producto)
    knex("productos").insert(producto)
    .then( () => {console.log("PRODUCTOS insertados")})
    .catch( e => {console.log(e); throw e;})
    //SqLite----------------------------------------------------------------------------------------  
    model.productos.insertMany(product)//MongoDB--

    return res.status(200).json(listaProductos);
  },

  listarProductos: async (req, res) => {
    const contenido = fs.readFileSync("productos.txt", "utf-8");
    let listaProductos = JSON.parse(contenido);
//SqLite----------------------------------------------------------------------------------------
    knex.from("productos").select("*")
    .then( rows => {
        for (row of rows) {
            console.log(` ${row["id"]} --- ${row["nombre"]}`);
        };
    })
    .catch( e => { console.log(e); throw e;})
//SqLite----------------------------------------------------------------------------------------   
    const respuesta = await model.productos.find({}).sort({nombre: 1}); //MongoDB-----
    console.log("lista productos de Mongo:", respuesta)
  
    res.status(200).json(listaProductos);
  },

  obtenerProductoPorId: async (req, res) => {
    const contenido = fs.readFileSync("productos.txt", "utf-8");
    let listaProductos = JSON.parse(contenido);
    const producto = listaProductos.find(
      (product) => product.id === req.params.id
    );
    if (!producto) {
      return res.status(400).send({ error: "producto no encontrado" });
    }
    const respuesta = await model.productos.find({id:req.params.id}); //MongoDB-----
    console.log("producto de Mongo:", respuesta)
    return res.status(200).json(producto);
  },

  actualizarProductoPorId: async (req, res) => {
    const contenido = fs.readFileSync("productos.txt", "utf-8");
    let listaProductos = JSON.parse(contenido);
    console.log("LISTAPRODUCTOS", listaProductos)
    if (!isProduct(req.body)) {
      return res.status(400).send("Error en los parametros");
    }
    const producto = listaProductos.find(
      (product) => product.id === req.params.id
    );
    if (!producto) {
      return res.status(400).send("No existe un producto con ese id");
    }
    let product = {
      nombre: req.body.nombre,
      precio: req.body.precio,
      descripcion: req.body.descripcion || "sin descripcion",
      codigo: moment().format("DD/MM/YYYY HH:MM:SS"),
      foto: req.body.foto,
      stock: req.body.stock,
      timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
      id: producto.id
    };
    const arrActualizado = listaProductos.filter(
      (product) => product.id !== producto.id
    );
    arrActualizado.push(product);
    listaProductos = arrActualizado;
    let file = JSON.stringify(listaProductos);
    fs.writeFileSync("./productos.txt", file);
    //SqLite----------------------------------------------------------------------------------------
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
    //SqLite----------------------------------------------------------------------------------------
    resultado = await model.productos.updateOne({ id: req.params.id }, { $set: product });//MongoDB---
    console.log("producto actualizado de Mongo:", resultado)
    return res.status(200).json(listaProductos);
  },

  borrarProductoPorId: async (req, res) => {
    const contenido = fs.readFileSync("productos.txt", "utf-8");
    let listaProductos = JSON.parse(contenido);
    const producto = listaProductos.find(
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
    //SqLite----------------------------------------------------------------------------------------
    knex.from("productos").where("id", "=", req.params.id).del()
    .then( () => {console.log("deleted")})
    .catch( e => {console.log(e); throw e;})
    //SqLite----------------------------------------------------------------------------------------
    resultado = await model.productos.deleteOne({id: req.params.id});//MongoDB- ----
    console.log("producto borrado de Mongo:", resultado)


    return res.status(200).send(listaProductos);
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