const model = require("./modelSchema")

module.exports = {
    agregarProducto: async (product) => await model.productos.insertMany(product),
    
    listarProductos: async () => {
      const data = await model.productos.find({}).sort({nombre: 1});
      return data
    },

    obtenerProductoPorId: async ( _id ) => {
      const data = await model.productos.findOne({$or:[
        {_id: _id}
      ]});
      return data
    },

    obtenerProductosPorCategoria: async ( productoID ) => {
      const data = await model.productos.find({$or:[
        {productoID: productoID}
      ]});
      return data
    },

    actualizarProductoPorId: async (_id, product) => {
      const info = await model.productos.updateOne({ _id: _id }, { $set: product })
      return info
    },

    borrarProductoPorId: async (_id) => {
      const info = await model.productos.deleteOne({_id: _id});
      return info
    },
         
}