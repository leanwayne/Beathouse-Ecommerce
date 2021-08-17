const express = require("express");
const config = require('../config/config')
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const session = require("express-session");
const compression = require("compression")
const app = express();
require("../optionsMongo/mongoOptions");
const passport = require("passport");
require("../passport/passport");
const http = require("http").createServer(app);
const PORT = process.env.PORT
const cors = require("cors");
const path = require("path");
const rutaProductos = require("./routes/productosRouter");
const rutaCarrito = require("./routes/carritoRouter");
const rutaSession = require("./routes/sessionRouter");
const rutaCarousel = require("./routes/carouselRouter")
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

//Session Setup
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        config.MONGOATLAS,
      mongoOptions: advancedOptions,
      ttl: 120,
      collectionName: "sessions",
    }),
    secret: "shhh",
    resave: true,
    saveUninitialized: false,
    rolling: true,
  })
);
//-----------------------
app.use(passport.initialize());
app.use(passport.session());
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cart", rutaCarrito);
app.use("/productos", rutaProductos);
app.use("/session", rutaSession);
app.use("/carousel", rutaCarousel);

http.listen(PORT, () => {
  console.log(`Server en puerto ${PORT}`);
});