const express = require('express')
const router = express.Router()
const productoController = require('../controllers/productoController')
const {verificar} = require('../middlewares/middlewares')
const {upload} = require('../../utils/multer/multer')

router.post('/agregar', upload.single('fotoUrl') ,productoController.agregarProducto)
router.get('/listar', productoController.listarProductos)
router.get('/listarid', productoController.obtenerProductoPorId)
router.get('/listarcodigo', productoController.obtenerProductoPorCodigo)
router.get('/listarCat', productoController.obtenerProductosPorCategoria)
router.get('/listarDestacados', productoController.obtenerProductosDestacados)
router.put('/actualizar', verificar, upload.single('fotoUrl'), productoController.actualizarProductoPorId)
router.delete('/borrar', verificar, productoController.borrarProductoPorId)
router.get('/vista-test', productoController.listarMockFaker)

module.exports = router
