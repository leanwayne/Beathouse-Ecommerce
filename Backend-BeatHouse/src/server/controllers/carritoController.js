const DAO = require('../models/cartDAO')
const DAOProduct = require('../models/productsDAO')
const moment = require('moment')

module.exports = {
    agregarProducto: async (req, res) => {
        if(!req.session.passport) return res.status(400).send('debe iniciar sesion para usar el carrito')
            const userInfo = await DAO.findUser(req.session.passport.user._id)
            let cartList = userInfo.cart
            const reqProduct = {
                product:{
                    codigoP: req.body.product.codigoP,
                    nombre:req.body.product.nombre,
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
        try {
            const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user
            const products = await DAO.listarProductos()//productos del listado
            if(!userInfo.cart.length > 0){ 
                return res.status(200).json([])
            }
            const cartProducts = userInfo.cart.map(cartProduct => {
                return {
                    producto: products.find(p => p._id.toString() === cartProduct.product.id),
                    cantidad: cartProduct.cantidad,
                }
            })
            cartProducts.sort((a, b) => a.producto.timestamp.localeCompare(b.producto.timestamp))

            return res.status(200).json(cartProducts)     
            
        }catch (error) {
            return res.status(400).send(error)
        }
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
            const userInfo = await DAO.findUser(req.session.passport.user._id)
            const products = await DAO.listarProductos()
            let ordersList = userInfo.buyOrders
            let stockInsuficiente = []
            const cartProducts = userInfo.cart.map(cartProduct => {
                if(cartProduct.cantidad <= products.find(p => p._id.toString() === cartProduct.product.id).stock){
                    return true
                }else{
                    stockInsuficiente.push(cartProduct)
                    return false
                }
            })
            const verificarStock = arr => arr.every(v => v === true)
            if(verificarStock(cartProducts)){
                const orderCode = (Math.random() + 1).toString(36).substring(7)
                userInfo.cart.forEach( async p => {
                    const productOriginal = await DAOProduct.obtenerProductoPorId(p.product.id)
                    const product = {
                        nombre: productOriginal.nombre,
                        descripcion: productOriginal.descripcion,
                        productoID: productOriginal.productoID,
                        marca: productOriginal.marca,
                        precio: productOriginal.precio,
                        fotoUrl: productOriginal.fotoUrl,
                        color: productOriginal.color,
                        stock: productOriginal.stock - p.cantidad,
                        codigoP: productOriginal.codigoP,
                        timestamp: productOriginal.timestamp,
                    }
                    const order = {
                        buyer:{name: userInfo.username, email: userInfo.email, orderCode: orderCode},
                        product:{name: productOriginal.nombre, color: productOriginal.color, price: productOriginal.precio, quantity: p.cantidad},
                        date: moment().format('DD/MM/YYYY HH:MM:SS')
                    }
                    ordersList.push(order)
                    await DAOProduct.actualizarProductoPorId(p.product.id, product)
                    await DAO.saveProductInCart(req.session.passport.user._id, []) 
                    await DAO.saveOrderInCart(req.session.passport.user._id, ordersList)                 
                })
                return res.status(200).json({orderCode:orderCode})
            }else{
                return res.status(200).json(stockInsuficiente)
            } 
        }catch (error) { 
            return error
        }  
    },

    totalProductosEnCart: async (req, res) => {
        if(!req.session.passport) return res.status(400).send('debe iniciar sesion para usar el carrito')
        try {
            const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user
            const cartQuantity = userInfo.cart
            const quantity = cartQuantity.reduce((sum, p) => sum + p.cantidad, 0)
            return res.status(200).json(quantity)   
        }catch (error) { 
            return res.status(400).send(error)
        }  
    },
}