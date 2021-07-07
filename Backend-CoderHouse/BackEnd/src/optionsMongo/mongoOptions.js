let mongoose = require('mongoose');

var db = mongoose.connection;
const mongoDB = 'mongodb://127.0.0.1/ecommerce';
const mongoAtlas = 'mongodb+srv://leandro:36847138@cluster0.gbzy8.mongodb.net/ecommerce?retryWrites=true&w=majority'
let conexion = ""
process.env.db === "MongoDb"? conexion = mongoDB : conexion = mongoAtlas
mongoose.connect(conexion, {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log(''))
.catch( err => console.log(err))

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;