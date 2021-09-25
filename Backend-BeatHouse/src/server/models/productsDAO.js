const model = require('./modelSchema')

module.exports = {
    addProduct: async (product) => await model.products.insertMany(product),
    
    listProducts: async () => {
        const data = await model.products.find({}).sort({timeStamp: 1});
        return data
    },

    findProductById: async (_id) => {
        const data = await model.products.findOne({$or:[
            {_id: _id}
        ]});
        return data
    },

    findProductByCode: async (productCode) => {
        const data = await model.products.find({$or:[
            {productCode: productCode}
        ]});
        return data
    },

    findProductsByCategory: async (productId) => {
        const data = await model.products.find({$or:[
            {productId: productId}
        ]});
        const groupBy = (key, arr) => arr
            .reduce(
                (cache, product) => {
                    const property = product[key]
                    if (property in cache) {
                        return {...cache, [property]: cache[property].concat(product)}
                    }
                  return {...cache, [property]: [product]}
                },{}
            )
        const dataArray = Object.values(groupBy('productCode', data)).map(p => p[0])
        return dataArray
    },

    updateProductById: async (_id, product) => {
         const info = await model.products.updateOne({ _id: _id }, {$set: product})
        return info
    },

    deleteProductById: async (_id) => {
        const info = await model.products.deleteOne({_id: _id});
        return info
    },        
}