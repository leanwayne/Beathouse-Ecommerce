const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carritoController");

router.post("/agregar/:id", carritoController.agregarId);
router.get("/listar", carritoController.listarProductos);
router.get("/listar/:id", carritoController.obtenerProductosPorId);
router.delete("/borrar/:id", carritoController.borrarProductoPorId);

module.exports = router;
