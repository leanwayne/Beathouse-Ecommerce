const model = require("../models/modelSchema")

//metodos del carrito controller
//agregar ---------------------------------(terminado)
//mostrar productos ---------------------------------(terminado)
//borrar producto por id ---------------------------------(terminado)
//finaliza 

let cartInt = (cartList) => {
  cartList.map( p => {
    p.product.stock = +p.product.stock
    p.product.precio = +p.product.precio
    p.cantidad = +p.cantidad
    return p
  })
  return cartList
} 

module.exports = {
  agregarProducto: async (req, res) => {
    if(!req.session.passport) return res.status(400).send("debe iniciar sesion para usar el carrito")
    const cartInfo = await model.usuarios.findOne({_id: req.session.passport.user._id}) // info del user
    let cartList = cartInfo.cart
    const reqProduct = {
      product:{
        nombre: req.body.nombre,
        descripcion: req.body.descripcion || "sin descripcion",
        marca: req.body.marca || "sin marca",
        precio: req.body.precio,
        color: req.body.color,
        stock: req.body.stock,
        codigoP: req.body.codigoP,
        id: req.body._id
      },
      cantidad: req.body.cantidad,     
    }
    if(!cartInfo.cart.find(p => p)){ //el cart contiene productos? 
      try {
        cartList.push(reqProduct)
        await model.usuarios.updateOne({ _id: req.session.passport.user._id }, { $set: {cart: cartInt(cartList)} })
        const cartInfo = await model.usuarios.findOne({_id: req.session.passport.user._id}) 
        return res.status(200).json(cartInfo.cart)
      } catch (error) {
        return res.status(400).send(error);        
        } 
      }
    if(!cartList.find(p => p.product.codigoP === reqProduct.product.codigoP && p.product.id === reqProduct.product.id )){ //distinto codigo de producto y id ? 
        try {
          cartList.push(reqProduct)
          await model.usuarios.updateOne({ _id: req.session.passport.user._id }, { $set: {cart: cartInt(cartList)} })
          const cartInfo = await model.usuarios.findOne({_id: req.session.passport.user._id})
          return res.status(200).json(cartInfo.cart)
        } catch (error) {
          return res.status(400).send(error);  
        }
    }
    else{
      try {
        const cartInfo = await model.usuarios.findOne({_id: req.session.passport.user._id})
        const oldProduct = cartInfo.cart.find(p => p.product.id === reqProduct.product.id && p.product.codigoP === reqProduct.product.codigoP )
        const newCart = cartInfo.cart.filter(p => p !== oldProduct)
        reqProduct.cantidad = +reqProduct.cantidad + oldProduct.cantidad
        newCart.push(reqProduct)
        await model.usuarios.updateOne({ _id: req.session.passport.user._id }, { $set: {cart: cartInt(newCart)} })
        const cartInfox= await model.usuarios.findOne({_id: req.session.passport.user._id})
        return res.status(200).json(cartInfox.cart)        
      } catch (error) {
        return res.status(400).send(error);       
      }
    }  
  },

  mostrarProductos: async (req, res) => {
    if(!req.session.passport) return res.status(400).send("debe iniciar sesion para usar el carrito")
    const cartInfo = await model.usuarios.findOne({_id: req.session.passport.user._id}) // info del user
    if(!cartInfo.cart.find(p => p)){ 
      return res.status(400).send("el cart esta vacio");  
    }
    else{
      return res.status(200).json(cartInfo.cart) 
    }
  },

    borrarProductoId: async (req, res) => {
      if(!req.session.passport) return res.status(400).send("debe iniciar sesion para usar el carrito")
      try {
        const cartInfo = await model.usuarios.findOne({_id: req.session.passport.user._id}) // info del user
        const newCart = cartInfo.cart.filter(p => p.product.id !== req.query.id)
        await model.usuarios.updateOne({ _id: req.session.passport.user._id }, { $set: {cart: cartInt(newCart)} })
        return res.status(200).json(newCart)   
      } catch (error) {
        return res.status(400).send(error);  
      }
    }
}