const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const {verificar} = require("../middlewares/middlewares");

router.post("/agregar", productoController.agregarProducto);
router.get("/listar", productoController.listarProductos);
router.get("/listar/:id", productoController.obtenerProductoPorId);
router.put("/actualizar/:id", verificar, productoController.actualizarProductoPorId);
router.delete("/borrar/:id", verificar, productoController.borrarProductoPorId);
router.get("/vista-test", productoController.listarMockFaker);

module.exports = router;
