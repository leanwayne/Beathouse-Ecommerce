const DAO = require("../models/cartDAO")

module.exports = {
  agregarProducto: async (req, res) => {
    if(!req.session.passport) return res.status(400).send("debe iniciar sesion para usar el carrito")
    const userInfo = await DAO.findUser(req.session.passport.user._id)
    let cartList = userInfo.cart
    const reqProduct = {
      product:{
        codigoP: req.body.codigoP,
        id: req.body._id
      },
      cantidad: req.body.cantidad,     
    }
    if(!userInfo.cart.length > 0){ //si el cart no tiene productos, agrego el producto directamente
      try {
        cartList.push(reqProduct)
        await DAO.saveProductInCart( req.session.passport.user._id, cartList)
        const userInfo = await DAO.findUser(req.session.passport.user._id) 
        return res.status(200).json(userInfo.cart)
      } catch (error) {
        return res.status(400).send(error);        
      } 
      }
    if(!cartList.find(p => p.product.codigoP === reqProduct.product.codigoP && p.product.id === reqProduct.product.id )){ //distinto codigo de producto y id ? 
        try {
          cartList.push(reqProduct)
          await DAO.saveProductInCart( req.session.passport.user._id, cartList)
          const userInfo = await DAO.findUser(req.session.passport.user._id)
          return res.status(200).json(userInfo.cart)
        } catch (error) {
          return res.status(400).send(error);  
        }
    }
    else{
      try {
        const userInfo = await DAO.findUser(req.session.passport.user._id)
        const oldProduct = userInfo.cart.find(p => p.product.id === reqProduct.product.id && p.product.codigoP === reqProduct.product.codigoP )
        const newCart = userInfo.cart.filter(p => p !== oldProduct)
        reqProduct.cantidad = +reqProduct.cantidad + oldProduct.cantidad
        newCart.push(reqProduct)
        await DAO.saveProductInCart( req.session.passport.user._id, newCart)
        const userInfox= await DAO.findUser(req.session.passport.user._id)
        return res.status(200).json(userInfox.cart)        
      } catch (error) {
        return res.status(400).send(error);       
      }
    }  
  },

  mostrarProductos: async (req, res) => {
    if(!req.session.passport) return res.status(400).send("debe iniciar sesion para usar el carrito")
    const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user
    const products = await DAO.listarProductos()//productos del listado
    if(!userInfo.cart.length > 0){ 
      return res.status(400).send("el cart esta vacio");  
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
    if(!req.session.passport) return res.status(400).send("debe iniciar sesion para usar el carrito")
    try {
      const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user
      const newCart = userInfo.cart.filter(p => p.product.id !== req.query.id)
      await DAO.saveProductInCart( req.session.passport.user._id, newCart)
      return res.status(200).json(newCart)   
    } catch (error) {
      return res.status(400).send(error);  
    }
  }
}