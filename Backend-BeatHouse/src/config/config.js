require('dotenv').config()

//const path = require('path')
//dotenv.config({
//    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
//})

module.exports = {
    MONGODB: process.env.MONGODB,
    MONGOATLAS: process.env.MONGOATLAS,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENTSECRET: process.env.CLIENTSECRET,
    PORT: process.env.PORT || 8080
}