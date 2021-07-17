let mongoose = require('mongoose');

var db = mongoose.connection;
const mongoDB = 'mongodb://127.0.0.1/ecommerce';
const mongoAtlas = 'mongodb+srv://leandro:36847138@cluster0.gbzy8.mongodb.net/ecommerce?retryWrites=true&w=majority'
const testDataBase = 'mongodb+srv://leandro:36847138@cluster0.gbzy8.mongodb.net/testEcommerce?retryWrites=true&w=majority'
let conexion = ""
//process.env.db === "MongoDb"? conexion = mongoDB : conexion = mongoAtlas
switch (process.env.db) {
    case "MongoDb":
      conexion = mongoDB
      console.log("Utilizando la DataBase MongoDb");
      break;
    case "MongoAtlas":
      conexion = mongoAtlas
      console.log("Utilizando la DataBase MongoAtlas");
      break;
    case "testDatabase":
        conexion = testDataBase
        console.log("Utilizando la DataBase testDataBase");
      break;  
    default:
      console.log("estas usando la DataBase MongoAtlas");
}

mongoose.connect(conexion, {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log(''))
.catch( err => console.log(err))

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;


