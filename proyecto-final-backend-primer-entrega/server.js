const express = require("express");
const app = express();
const http = require("http").createServer(app);
const handlebars = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const path = require("path");
const rutaProductos = require("./routes/productos");
const rutaCarrito = require("./routes/carrito");

//handlebars----------------------------------------------------------
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views/partials"),
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//-----------------------------------------------------------------

//form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/carrito", rutaCarrito);
app.use("/productos", rutaProductos);

http.listen(PORT, () => {
  console.log(`Server en puerto ${PORT}`);
});
