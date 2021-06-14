const express = require("express");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const session = require("express-session");
const app = express();
require("./optionsMongo/mongoOptions");
const passport = require("passport");
require("./passport/passport");
const fs = require("fs");
const { fork } = require("child_process") 
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const handlebars = require("express-handlebars");
const PORT = process.argv[2] || 8080
const cors = require("cors");
const path = require("path");
const rutaProductos = require("./routes/productosRouter");
const rutaCarrito = require("./routes/carritoRouter");
const rutaSession = require("./routes/sessionRouter");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const { mensajesDB } = require("./optionsSqLite/sqLiteOptions");
const knex = require("knex")(mensajesDB);
const model = require("./models/modelSchema");
app.use(cookieParser());
//Session Setup
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://leandro:36847138@cluster0.gbzy8.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      ttl: 10,
      collectionName: "sessions",
    }),
    secret: "shhh",
    resave: true,
    saveUninitialized: false,
    rolling: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
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
//app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//------------------------------------------------------------------------
if (process.env.db === "SqLite") {
  knex.schema.hasTable("mensajes").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("mensajes", (table) => {
        table.string("email", 100);
        table.string("timestamp", 50);
        table.string("mensaje");
      });
    } else {
      console.log("Trabajando con DB mensajes");
    }
  });
}
//socket------------------------------product-------------------------------------------------------------------------
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
    console.log("listamentajes", listaMensajes);
    //SqLite----------------------------------------------------------------------------------------
    if (process.env.db === "SqLite") {
      knex("mensajes")
        .insert(messageFile)
        .then(() => {
          console.log("mensaje guardado");
        })
        .catch((e) => {
          console.log(e);
          throw e;
        });
    }
    //SqLite----------------------------------------------------------------------------------------
    try {
      if (process.env.db === "fileSystem") {
        await fs.promises.writeFile(
          "messages.txt",
          JSON.stringify(listaMensajes)
        );
      }
      if (process.env.db === "MongoDb") {
        await model.mensajes.insertMany(messageFile); //MongoDB--
      }
    } catch (err) {
      console.log("Error de escritura", err.error);
    }
  });
});
//socket-------------------------------------------------------------------------------------------------------
switch (process.env.db) {
  case "fileSystem":
    console.log("Utilizando la DataBase FileSystem");
    break;
  case "SqLite":
    console.log("Utilizando la DataBase SqLite");
    break;
  case "MongoDb":
    console.log("Utilizando la DataBase MongoDb");
    break;
  case "MongoAtlas":
    console.log("Utilizando la DataBase MongoAtlas");
    break;
  default:
    console.log(
      "estas usando todas las bases de datos a la vez (no es recomendable)"
    );
}

//form
app.get("/", (req, res) => {
  res.render("index", {});
});

//clase 28. Global Process y Child Process////////////////////////////////////////
app.get("/info",(req, res) => {
  res.json(
    {
      'argumentos de entrada': process.argv[2] || "",
      'Nombre de la plataforma': process.platform,
      'Version de node.js': process.version,
      'Uso de memoria': process.memoryUsage(),
      'Path de ejecucion': process.argv[1],
      'Process id': process.pid,
      'Carpeta corriente': process.cwd(),
    }
  )
})

app.get("/randoms",(req, res) => {                                    ///////////activar para probar el desafio 28, mantener comentado para le desafio 29/////////
  const calculo = fork("./controllers/functions.js")
  const num = req.query.num || 100
  console.log("NUM desde ruta=",num)
  calculo.send(num)
  calculo.on('message', random => {
    res.status(200).json(random)
  })
})
/////////////////////////////////////////////////////////////////////////////////


app.use("/carrito", rutaCarrito);
app.use("/productos", rutaProductos);
app.use("/session", rutaSession);

http.listen(PORT, () => {
  console.log(`Server en puerto ${PORT}`);
});
