const express = require("express");
const app = express();
require('./optionsMongo/mongoOptions')
const fs = require("fs");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const handlebars = require("express-handlebars");
const PORT = process.env.PORT || 8080;
var cors = require("cors");
const path = require("path");
const rutaProductos = require("./routes/productosRouter");
const rutaCarrito = require("./routes/carritoRouter");
app.use(cors());
const {mensajesDB} = require("./optionsSqLite/sqLiteOptions");
const knex = require("knex")(mensajesDB)
const model = require("./models/modelSchema")

//handlebars----------------------------------------------------------
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views/partials"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//------------------------------------------------------------------------
knex.schema.hasTable('mensajes').then(exists =>{
  if (!exists) {
    return knex.schema.createTable('mensajes', table => {
      table.string('email', 100);
      table.string('timestamp', 50);  
      table.string('mensaje');
    });
  }else{
    console.log("Trabajando con DB mensajes") 
  }
})
//socket-------------------------------------------------------------------------------------------------------
let listaMensajes = [];
io.on("connection", (socket) => {
  socket.on("client-mensaje", async (message) => {
    io.emit("server-mensaje", message);
    let messageFile = {
      email: message.email,
      timestamp: message.timestamp,
      mensaje: message.mensaje,
    };
    listaMensajes.push(messageFile);
    console.log("listamentajes", listaMensajes)
        //SqLite----------------------------------------------------------------------------------------
        knex("mensajes").insert(messageFile)
        .then( () => {console.log("mensaje guardado")})
        .catch( e => {console.log(e); throw e;})
        //SqLite----------------------------------------------------------------------------------------
    try {
      await fs.promises.writeFile(
        "messages.txt",
        JSON.stringify(listaMensajes)
      );
      await model.mensajes.insertMany(messageFile)//MongoDB--
    } catch (err) {
      console.log("Error de escritura", err.error);
    }
  });
});
//socket-------------------------------------------------------------------------------------------------------
//form
app.get("/", (req, res) => {
  res.render("index", {  
  });
});

app.use("/carrito", rutaCarrito);
app.use("/productos", rutaProductos);

http.listen(PORT, () => {
  console.log(`Server en puerto ${PORT}`);
});