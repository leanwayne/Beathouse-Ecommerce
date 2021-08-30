const DAO = require('../models/cartDAO')

module.exports = {
    agregarProducto: async (req, res) => {
        if(!req.session.passport) return res.status(400).send('debe iniciar sesion para usar el carrito')
            const userInfo = await DAO.findUser(req.session.passport.user._id)
            let cartList = userInfo.cart
            const reqProduct = {
                product:{
                    codigoP: req.body.product.codigoP,
                    id: req.body.product.id,
                    color: req.body.product.color,
                    stock: req.body.product.stock,
                },
                cantidad: req.body.cantidad,     
            }
        if(!cartList.find(p => p.product.codigoP === reqProduct.product.codigoP && p.product.id === reqProduct.product.id)){ //distinto codigo de producto y id ? 
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
                const oldProduct = userInfo.cart.find(p => p.product.id === reqProduct.product.id && p.product.codigoP === reqProduct.product.codigoP)
                if(+reqProduct.cantidad + oldProduct.cantidad >= oldProduct.product.stock+1) return res.status(400).json('quantity error')
                const newCart = userInfo.cart.filter(p => p !== oldProduct)
                reqProduct.cantidad = +reqProduct.cantidad + oldProduct.cantidad
                newCart.push(reqProduct)
                await DAO.saveProductInCart( req.session.passport.user._id, newCart)
                const cart= await DAO.findUser(req.session.passport.user._id)
                return res.status(200).json(cart.cart)        
            }catch (error) {
                return res.status(400).send(error)     
            }
        }  
    },

    mostrarProductos: async (req, res) => {
        if(!req.session.passport) return res.status(400).send('debe iniciar sesion para usar el carrito')
            const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user
            const products = await DAO.listarProductos()//productos del listado
        if(!userInfo.cart.length > 0){ 
            return res.status(400).send('el cart esta vacio')
        }
        const cartProducts = userInfo.cart.map(cartProduct => {
            return {
                producto: products.find(p => p._id.toString() === cartProduct.product.id),
                cantidad: cartProduct.cantidad,
            }
        })
        return res.status(200).json(cartProducts)     
    },

    borrarProductoId: async (req, res) => {
        if(!req.session.passport) return res.status(400).send('debe iniciar sesion para usar el carrito')
        try {
            const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user
            const newCart = userInfo.cart.filter(p => p.product.id !== req.query.id)
            await DAO.saveProductInCart( req.session.passport.user._id, newCart)
            return res.status(200).json(newCart)   
        }catch (error) {
            return res.status(400).send(error)
        }
    },

    modificarCantidad: async (req, res) => {
        if(!req.session.passport) return res.status(400).send('debe iniciar sesion para usar el carrito')
        try {
            const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user
            const filteredCart = userInfo.cart.filter(p => p.product.id === req.query.id)
            const product = filteredCart[0]
            product.cantidad = req.body.quantity
            const newCart = userInfo.cart.filter(p => p.product.id !== req.query.id)
            newCart.push(product)
            await DAO.saveProductInCart( req.session.passport.user._id, newCart)
            return res.status(200).json(product)    
        }catch (error) {
            return res.status(400).send(error)
        }
    },

    finalizarCompra: async (req, res) => {
        if(!req.session.passport) return res.status(400).send('debe iniciar sesion para usar el carrito')
        try {
            const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user      
        }catch (error) { 
        }  
    },
}