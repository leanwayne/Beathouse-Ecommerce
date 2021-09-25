let moment = require('moment')
const { getFakeProducts } = require('../../utils/fakerMock/productoFaker')
const fs = require('fs')
const DAO = require('../models/productsDAO')
const logger = require('../../utils/log4js/log4js')

module.exports = { 
    addProduct: async (req, res) => {
        if (!isProduct(req.body, req.file)){
            return res.status(400).send('error on params')
        }
        const bitmap = fs.readFileSync(`./archivos/${req.file.originalname}`)
        const base64 = new Buffer.from(bitmap).toString('base64')
        let product = {
            name: req.body.name,
            productId: req.body.productId,
            price: req.body.price,
            stock: req.body.stock,
            brand: req.body.brand,
            productCode: req.body.productCode,
            description: req.body.description || 'no description',
            photoUrl: base64 || 'no photo',
            color: req.body.color,
            timeStamp: moment().format('DD/MM/YYYY HH:MM:SS'),
        }
        fs.unlinkSync(`./archivos/${req.file.originalname}`)
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){  
            try {
                const info = await DAO.addProduct(product)
                logger.logInfo.info('product added to mongoDB')
                return res.status(200).json(info[0])
            }catch (error){
                logger.logInfo.error('cant add the product to mongoDB',error)
                return res.status(400).send(error)
            } 
        }
    },

    listProducts: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                const products = await DAO.listProducts()
                logger.logInfo.info('products listed')  
                res.status(200).json(products)
            }catch (error){
                res.status(400).send(error)
            }
        }
    },

    findProductsByCategory: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                const products = await DAO.findProductsByCategory(req.query.productId)
                logger.logInfo.info('products finded', products.length)
                if(products.length === 0)return res.status(400).send('no products on the params specified')
                return res.status(200).json(products)
            }catch (error){
                return res.status(400).send(error)
            }
        }  
    },

    listFeaturedProducts: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                const products = await DAO.listProducts()
                const featuredProducts = products.sort((a, b) => 0.5 - Math.random()).slice(0, 6).map(product => product)
                logger.logInfo.info('products featuredProducts', featuredProducts.length)
                res.status(200).json(featuredProducts)
            }catch (error) {
                res.status(400).send(error)
            }
        }
    },

    findProductById: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                const products = await DAO.findProductById(req.query.id)
                logger.logInfo.info('products finded')
                if(products.length === 0)return res.status(400).send('no products on the params specified')
                return res.status(200).json(products)
            }catch (error) {
                return res.status(400).send(error)
            }
        }  
    },

    findProductByCode: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                const products = await DAO.findProductByCode(req.query.productCode)
                logger.logInfo.info('products finded')
                if(products.length === 0)return res.status(400).send('no products on the params specified')
                return res.status(200).json(products)
            }catch (error) {
                return res.status(400).send(error)
            }
        }  
    },

    updateProductById: async (req, res) => {
        let originalProduct
        try {
            originalProduct = await DAO.findProductById(req.query.id)
        }catch (error) {
            return res.status(400).send('invalid id')
        }
        let base64 = originalProduct.photoUrl
        if(req.file){
            const bitmap = fs.readFileSync(`./archivos/${req.file.originalname}`)
            base64 = new Buffer.from(bitmap).toString('base64')
        }
        let product = {
            name: req.body.name || originalProduct.name,
            description: req.body.description || originalProduct.description,
            productId: req.body.productId || originalProduct.productId,
            brand: req.body.brand || originalProduct.brand,
            price: req.body.price || originalProduct.price,
            photoUrl: base64 || originalProduct.photoUrl,
            color: req.body.color || originalProduct.color,
            stock: req.body.stock || originalProduct.stock,
            productCode: req.body.productCode || originalProduct.productCode,
            timeStamp: moment().format('DD/MM/YYYY HH:MM:SS'),
        }
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                info = await DAO.updateProductById(req.query.id, product)
                logger.logInfo.info('product updated on Mongo:', info)
                return res.status(200).json(product)
            }catch (error) {
                logger.logInfo.error('cant update the product', error)
                return res.status(400).send(error)
            }
        }  
    },

    deleteProductById: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                result = await DAO.deleteProductById(req.query.id)
                console.log('product deleted from Mongo:', result)  
                return res.status(200).json(result)
            }catch (error) {
                logger.logInfo.error('the product could not be deleted',error)
                return res.status(400).send(error)
            }
        }
    },
  
    listarMockFaker: async (req, res) => {
        let cant = req.query.cant || 10
        let products = []
        if(cant == 0){
            res.status(400).send({error: "no products"})
        }else{
            for(let i = 0; i < cant; i++) {
                let producto = getFakeProducts()
                products.push(producto)
            }
            return res.status(200).send(products)
        }
    },
}

const isProduct = (object,file) => {
    return (
        object.name
        && object.productId 
        && object.price
        && object.stock 
        && object.brand 
        && object.productCode 
        && file
        && object.color
    )
}
