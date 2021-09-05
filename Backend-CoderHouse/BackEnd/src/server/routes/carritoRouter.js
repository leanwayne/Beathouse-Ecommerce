const express = require('express')
const router = express.Router()
const carritoController = require('../controllers/carritoController')

router.put('/agregar', carritoController.agregarProducto)
router.put('/modificar', carritoController.modificarCantidad)
router.get('/listar', carritoController.mostrarProductos)
router.get('/totalProductosEnCart', carritoController.totalProductosEnCart)
router.delete('/borrar', carritoController.borrarProductoId)
router.post('/finalizarCompra', carritoController.finalizarCompra)

module.exports = router
