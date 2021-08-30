const model = require('./modelSchema')

module.exports = {
    agregarProducto: async (product) => await model.productos.insertMany(product),
    
    listarProductos: async () => {
        const data = await model.productos.find({}).sort({nombre: 1});
        return data
    },

    obtenerProductoPorId: async (_id) => {
        const data = await model.productos.findOne({$or:[
            {_id: _id}
        ]});
        return data
    },

    obtenerProductoPorCodigo: async (codigoP) => {
        const data = await model.productos.find({$or:[
            {codigoP: codigoP}
        ]});
        return data
    },

    obtenerProductosPorCategoria: async (productoID) => {
        const data = await model.productos.find({$or:[
            {productoID: productoID}
        ]});
        const groupBy = (key,arr) => arr
            .reduce(
                (cache, product) => {
                    const property = product[key]
                    if (property in cache) {
                        return {...cache, [property]: cache[property].concat(product)}
                    }
                  return {...cache, [property]: [product]}
                },{}
            )
        const dataArray = Object.values(groupBy('codigoP', data)).map(p => p[0])
        return dataArray
    },

    actualizarProductoPorId: async (_id, product) => {
         const info = await model.productos.updateOne({ _id: _id }, {$set: product})
        return info
    },

    borrarProductoPorId: async (_id) => {
        const info = await model.productos.deleteOne({_id: _id});
        return info
    },
         
}