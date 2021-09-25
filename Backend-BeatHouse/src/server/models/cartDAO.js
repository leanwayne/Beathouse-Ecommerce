const model = require("./modelSchema")

let cartInt = (cartList) => {
    cartList.map(p => {
        p.quantity = +p.quantity
        return p
    })
    return cartList
  }

module.exports = {
    findUser: async(_id) => await model.users.findOne({_id: _id}),

    findUserByName: async(username) => await model.users.findOne({username: username}),

    findProductById: async (_id) => {
        const data = await model.products.findOne({_id: _id})
        return data
    },

    listProducts: async () => {
        const data = await model.products.find({}).sort({timeStamp: 1}) //antes era por nombre
        return data
    },

    saveProductInCart: async (_id, cartList) => await model.users
    .updateOne({ _id:_id }, { $set: {cart: cartInt(cartList)}}),

    saveOrderInCart: async (_id, orders) => await model.users
    .updateOne({ _id:_id }, { $set: {buyOrders: orders}}),   
}