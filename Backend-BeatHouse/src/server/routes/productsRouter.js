const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')
const {verify} = require('../middlewares/middlewares')
const {upload} = require('../../utils/multer/multer')

router.post('/add', upload.single('photoUrl') ,productsController.addProduct)
router.get('/listproducts', productsController.listProducts)
router.get('/listbyid', productsController.findProductById)
router.get('/listbycode', productsController.findProductByCode)
router.get('/listbycategory', productsController.findProductsByCategory)
router.get('/listfeatured', productsController.listFeaturedProducts)
router.put('/update', verify, upload.single('photoUrl'), productsController.updateProductById)
router.delete('/delete', verify, productsController.deleteProductById)
router.get('/vista-test', productsController.listarMockFaker)

module.exports = router
