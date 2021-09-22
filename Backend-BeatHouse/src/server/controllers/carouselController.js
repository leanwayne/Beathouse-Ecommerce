const DAO = require('../models/carouselDAO')
const logger = require('../../utils/log4js/log4js')
const fs = require('fs')
module.exports = {
    getCarouselItems: async (req,res) => {
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){
            try {
                const carouselItems = await DAO.getCarouselItems()
                carouselItems.sort((a, b) => a.title.localeCompare(b.title))
                res.status(200).json(carouselItems)
            }catch(error) {
                res.status(400).send(error)
            }
        }
    },

    uploadCarouselItem: async (req, res) => {
        const bitmap = fs.readFileSync(`./archivos/${req.file.originalname}`)
        const base64 = new Buffer.from(bitmap).toString('base64')
        let carouselItem = {
            title: req.body.title,
            description: req.body.description,
            image: base64,
        };
        fs.unlinkSync(`./archivos/${req.file.originalname}`)  
        if(process.env.db === 'MongoDb' || process.env.db === 'MongoAtlas'){  
            try {
                const info = await DAO.uploadCarouselItem(carouselItem)
                logger.logInfo.info('item added successfully')
                return res.status(200).json(info[0])
            }catch (error) {
                logger.logInfo.error('item not added',error)
                return res.status(400).send(error)
            } 
        }
     },      
}
