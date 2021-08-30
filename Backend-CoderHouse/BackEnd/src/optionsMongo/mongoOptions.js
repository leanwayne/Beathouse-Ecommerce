let mongoose = require('mongoose');
const config = require('../config/config')
const logger = require('../utils/log4js/log4js')

var db = mongoose.connection
const mongoDB = config.MONGODB
const mongoAtlas = config.MONGOATLAS
let conexion = ''
switch (process.env.db) {
    case 'MongoDb':
        conexion = mongoDB
        logger.logInfo.info('Utilizando la DataBase MongoDb')
    break;
    case 'MongoAtlas':
        conexion = mongoAtlas
        logger.logInfo.info('Utilizando la DataBase MongoAtlas')
    break;
    default: logger.logInfo.info('estas usando la DataBase MongoAtlas')
}

mongoose.connect(conexion, {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log(''))
.catch( err => console.log(err))
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
module.exports = mongoose


