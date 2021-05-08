const express = require("express");
const router = express.Router();
const procutoController = require("../controllers/productoController");
const {verificar} = require("../middlewares/middlewares");

router.post("/agregar", procutoController.agregarProducto);
router.get("/listar", procutoController.listarProductos);
router.get("/listar/:id", procutoController.obtenerProductoPorId);
router.put("/actualizar/:id", verificar, procutoController.actualizarProductoPorId);
router.delete("/borrar/:id", verificar, procutoController.borrarProductoPorId);
router.get("/vista-test", procutoController.listarMockFaker);

module.exports = router;