const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const {verify} = require('../middlewares/middlewares')

router.put('/addtocart', verify, cartController.addProduct)
router.put('/modifyquantity', verify, cartController.modifyquantity)
router.get('/listcart', verify, cartController.showProducts)
router.get('/cartproductsquantity', verify, cartController.cartProductsQuantity)
router.delete('/delete', verify, cartController.deleteProductById)
router.put('/finalizepurchase', verify, cartController.finalizePurchase)

module.exports = router
