const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carritoController");

router.put("/agregar", carritoController.agregarProducto);
router.get("/listar", carritoController.mostrarProductos );
router.delete("/borrar", carritoController.borrarProductoId );

module.exports = router;
