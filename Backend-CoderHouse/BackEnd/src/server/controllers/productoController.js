let moment = require('moment');
const { getFakeProducts } = require('../../utils/fakerMock/productoFaker')
const fs = require('fs')
const DAO = require('../models/productsDAO')
const logger = require('../../utils/log4js/log4js')

module.exports = { 
    agregarProducto: async (req, res) => {
        if (!isProduct(req.body, req.file)){
            return res.status(400).send('Error en los parametros')
        }
        const bitmap = fs.readFileSync(`./archivos/${req.file.originalname}`)
        const base64 = new Buffer.from(bitmap).toString('base64')
        let product = {
            nombre: req.body.nombre,
            productoID: req.body.productoID,
            precio: req.body.precio,
            stock: req.body.stock,
            marca: req.body.marca,
            codigoP: req.body.codigoP,
            descripcion: req.body.descripcion || 'sin descripcion',
            fotoUrl: base64 || 'sin foto',
            color: req.body.color,
            timestamp: moment().format('DD/MM/YYYY HH:MM:SS'),
        };
        fs.unlinkSync(`./archivos/${req.file.originalname}`)
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){  
            try {
                const info = await DAO.agregarProducto(product)
                logger.logInfo.info('producto agregado a mongoDB')
                return res.status(200).json(info[0])
            }catch (error){
                logger.logInfo.error('no se pudo agregar el producto',error)
                return res.status(400).send(error)
            } 
        }
    },

    listarProductos: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                const respuesta = await DAO.listarProductos()
                logger.logInfo.info('lista productos Mongo')  
                res.status(200).json(respuesta)
            }catch (error){
                res.status(400).send(error)
            }
        }
    },

    obtenerProductosPorCategoria: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                const respuesta = await DAO.obtenerProductosPorCategoria(req.query.productoID)
                logger.logInfo.info('productos encontrados', respuesta.length)
                if(respuesta.length === 0)return res.status(400).send('no hay productos con los parametros indicados')
                return res.status(200).json(respuesta)
            }catch (error){
                return res.status(400).send(error)
            }
        }  
    },

    obtenerProductosDestacados: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                const productos = await DAO.listarProductos()
                const destacados = productos.sort((a, b) => 0.5 - Math.random()).slice(0, 6).map(product => product)
                logger.logInfo.info('productos destacados', destacados.length)
                res.status(200).json(destacados)
            }catch (error) {
                res.status(400).send(error)
            }
        }
    },

    obtenerProductoPorId: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                const respuesta = await DAO.obtenerProductoPorId(req.query.id)
                logger.logInfo.info('producto encontrado')
                if(respuesta.length === 0)return res.status(400).send('no hay productos con los parametros indicados')
                return res.status(200).json(respuesta)
            }catch (error) {
                return res.status(400).send(error)
            }
        }  
    },

    obtenerProductoPorCodigo: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                const respuesta = await DAO.obtenerProductoPorCodigo(req.query.codigoP)
                logger.logInfo.info('productos encontrados')
                if(respuesta.length === 0)return res.status(400).send('no hay productos con los parametros indicados')
                return res.status(200).json(respuesta)
            }catch (error) {
                return res.status(400).send(error)
            }
        }  
    },

    actualizarProductoPorId: async (req, res) => {
        let productOriginal
        try {
            productOriginal = await DAO.obtenerProductoPorId(null, req.query.id)
        }catch (error) {
            return res.status(400).send('Id incorrecto')
        }
        let base64 = productOriginal[0].fotoUrl
        if(req.file){
            const bitmap = fs.readFileSync(`./archivos/${req.file.originalname}`)
            base64 = new Buffer.from(bitmap).toString('base64')
        }
        let product = {
            nombre: req.body.nombre || productOriginal[0].nombre,
            descripcion: req.body.descripcion || productOriginal[0].descripcion,
            productoID: req.body.productoID || productOriginal[0].productoID,
            marca: req.body.marca || productOriginal[0].marca,
            precio: req.body.precio || productOriginal[0].precio,
            fotoUrl: base64 || productOriginal[0].fotoUrl,
            color: req.body.color || productOriginal[0].color,
            stock: req.body.stock || productOriginal[0].stock,
            codigoP: req.body.codigoP || productOriginal[0].codigoP,
            timestamp: moment().format('DD/MM/YYYY HH:MM:SS'),
        };
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                info = await DAO.actualizarProductoPorId(req.query.id, product)
                logger.logInfo.info('producto actualizado de Mongo:', info)
                return res.status(200).json(product)
            }catch (error) {
                logger.logInfo.error('no se pudo actualizar el producto', error)
                return res.status(400).send(error)
            }
        }  
    },

    borrarProductoPorId: async (req, res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                resultado = await DAO.borrarProductoPorId(req.query.id)
                console.log('producto borrado de Mongo:', resultado)  
                return res.status(200).json(resultado)
            }catch (error) {
                logger.logInfo.error('el producto no pudo ser borrado',error)
                return res.status(400).send(error)
            }
        }
    },
  
    listarMockFaker: async (req, res) => {
        let cant = req.query.cant || 10
        let productos = []
        if(cant == 0){
            res.status(400).send({error: "no hay productos"})
        }else{
            for(let i = 0; i < cant; i++) {
                let producto = getFakeProducts()
                productos.push(producto)
            }
            return res.status(200).send(productos)
        }
    },
}

const isProduct = (object,file) => {
    return (
        object.nombre
        && object.productoID 
        && object.precio
        && object.stock 
        && object.marca 
        && object.codigoP 
        && file
        && object.color
    )
}
