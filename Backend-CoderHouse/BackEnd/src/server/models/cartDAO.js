const model = require("./modelSchema")

let cartInt = (cartList) => {
    cartList.map( p => {
      p.cantidad = +p.cantidad
      return p
    })
    return cartList
  }

module.exports = {
    findUser: async(_id) => await model.usuarios.findOne({_id: _id}),

    obtenerProductoPorId: async (_id) => {
      const data = await model.productos.findOne({_id: _id});
      return data
    },

    listarProductos: async () => {
      const data = await model.productos.find({}).sort({nombre: 1});
      return data
    },

    saveProductInCart: async (_id, cartList) => await model.usuarios.updateOne({ _id:_id }, { $set: {cart: cartInt(cartList)}}),
    
}