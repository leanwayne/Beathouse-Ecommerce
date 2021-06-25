const express = require("express");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const session = require("express-session");
const compression = require("compression")
const app = express();
require("./optionsMongo/mongoOptions");
const passport = require("passport");
require("./passport/passport");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const handlebars = require("express-handlebars");
const PORT = process.env.PORT || 8080
const cors = require("cors");
const path = require("path");
const rutaProductos = require("./routes/productosRouter");
const rutaCarrito = require("./routes/carritoRouter");
const rutaSession = require("./routes/sessionRouter");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const model = require("./models/modelSchema");
app.use(cookieParser());
//Session Setup
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://leandro:36847138@cluster0.gbzy8.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      ttl: 20,
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
app.use(compression())
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

    try {     
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

app.use("/carrito", rutaCarrito);
app.use("/productos", rutaProductos);
app.use("/session", rutaSession);

http.listen(PORT, () => {
  console.log(`Server en puerto ${PORT}`);
});
