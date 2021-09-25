const DAO = require('../models/cartDAO')
const DAOProduct = require('../models/productsDAO')
const moment = require('moment')

module.exports = {
    addProduct: async (req, res) => {
            const userInfo = await DAO.findUser(req.session.passport.user._id)
            let cartList = userInfo.cart
            const reqProduct = {
                product:{
                    productCode: req.body.product.productCode,
                    name:req.body.product.name,
                    id: req.body.product.id,
                    color: req.body.product.color,
                    stock: req.body.product.stock,
                },
                quantity: req.body.quantity,     
            }
        if(!cartList.find(p => p.product.productCode === reqProduct.product.productCode && p.product.id === reqProduct.product.id)){ //distinto codigo de producto y id ? 
            try {
                cartList.push(reqProduct)
                await DAO.saveProductInCart(req.session.passport.user._id, cartList)
                const userInfo = await DAO.findUser(req.session.passport.user._id)
                return res.status(200).json(userInfo.cart)
            }catch(error) {
                return res.status(400).send(error)
            }
        }else {
            try {
                const userInfo = await DAO.findUser(req.session.passport.user._id)
                const oldProduct = userInfo.cart.find(p => p.product.id === reqProduct.product.id && p.product.productCode === reqProduct.product.productCode)
                if(+reqProduct.quantity + oldProduct.quantity >= oldProduct.product.stock+1) return res.status(400).json('quantity error')
                const newCart = userInfo.cart.filter(p => p !== oldProduct)
                reqProduct.quantity = +reqProduct.quantity + oldProduct.quantity
                newCart.push(reqProduct)
                await DAO.saveProductInCart( req.session.passport.user._id, newCart)
                const cart= await DAO.findUser(req.session.passport.user._id)
                return res.status(200).json(cart.cart)        
            }catch (error) {
                return res.status(400).send(error)     
            }
        }  
    },

    showProducts: async (req, res) => {
        try {
            const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user
            const products = await DAO.listProducts()//productos del listado
            if(!userInfo.cart.length > 0){ 
                return res.status(200).json([])
            }
            const cartProducts = userInfo.cart.map(cartProduct => {
                return {
                    product: products.find(p => p._id.toString() === cartProduct.product.id),
                    quantity: cartProduct.quantity,
                }
            })
            cartProducts.sort((a, b) => a.product.timeStamp.localeCompare(b.product.timeStamp))
            return res.status(200).json(cartProducts)                
        }catch (error) {
            return res.status(400).send(error)
        }
    },

    deleteProductById: async (req, res) => {
        try {
            const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user
            const newCart = userInfo.cart.filter(p => p.product.id !== req.query.id)
            await DAO.saveProductInCart( req.session.passport.user._id, newCart)
            return res.status(200).json(newCart)   
        }catch (error) {
            return res.status(400).send(error)
        }
    },
    
    modifyquantity: async (req, res) => {
        try {
            const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user
            const filteredCart = userInfo.cart.filter(p => p.product.id === req.query.id)
            const product = filteredCart[0]
            product.quantity = req.body.quantity
            const newCart = userInfo.cart.filter(p => p.product.id !== req.query.id)
            newCart.push(product)
            await DAO.saveProductInCart( req.session.passport.user._id, newCart)
            return res.status(200).json(product)    
        }catch (error) {
            return res.status(400).send(error)
        }
    },

    finalizePurchase: async (req, res) => {
        try {
            const userInfo = await DAO.findUser(req.session.passport.user._id)
            const products = await DAO.listProducts()
            let ordersList = userInfo.buyOrders
            let outOfStock = []
            const cartProducts = userInfo.cart.map(cartProduct => {
                if(cartProduct.quantity <= products.find(p => p._id.toString() === cartProduct.product.id).stock){
                    return true
                }else{
                    outOfStock.push(cartProduct)
                    return false
                }
            })
            const checkStock = arr => arr.every(v => v === true)
            if(checkStock(cartProducts)){
                const orderCode = (Math.random() + 1).toString(36).substring(7)
                userInfo.cart.forEach( async p => {
                    const originalProduct = await DAOProduct.findProductById(p.product.id)
                    const product = {
                        name: originalProduct.name,
                        description: originalProduct.description,
                        productId: originalProduct.productId,
                        brand: originalProduct.brand,
                        price: originalProduct.price,
                        photoUrl: originalProduct.photoUrl,
                        color: originalProduct.color,
                        stock: originalProduct.stock - p.quantity,
                        productCode: originalProduct.productCode,
                        timeStamp: originalProduct.timeStamp,
                    }
                    const order = {
                        buyer:{name: userInfo.username, email: userInfo.email, orderCode: orderCode},
                        product:{name: originalProduct.name, color: originalProduct.color, price: originalProduct.price, quantity: p.quantity},
                        date: moment().format('DD/MM/YYYY HH:MM:SS')
                    }
                    ordersList.push(order)
                    await DAOProduct.updateProductById(p.product.id, product)
                    await DAO.saveProductInCart(req.session.passport.user._id, []) 
                    await DAO.saveOrderInCart(req.session.passport.user._id, ordersList)                 
                })
                return res.status(200).json({orderCode:orderCode})
            }else{
                return res.status(200).json(outOfStock)
            } 
        }catch (error) { 
            return error
        }  
    },

    cartProductsQuantity: async (req, res) => {
        try {
            const userInfo = await DAO.findUserByName(req.session.passport.user.username) // info del user
            const cartQuantity = userInfo.cart
            const quantity = cartQuantity.reduce((sum, p) => sum + p.quantity, 0)
            return res.status(200).json(quantity)   
        }catch (error) { 
            return res.status(400).send(error)
        }  
    },
}