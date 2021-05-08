let mongoose = require('mongoose');

var db = mongoose.connection;
const mongoDB = 'mongodb://127.0.0.1/ecommerce';
const mongoAtlas = 'mongodb+srv://leandro:<password>@cluster0.gbzy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log('conectado a la base MongoDb'))
.catch( err => console.log(err))

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;