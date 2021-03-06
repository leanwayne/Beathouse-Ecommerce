const express = require('express')
const config = require('../config/config')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const session = require('express-session')
const compression = require('compression')
const app = express()
require('../optionsMongo/mongoOptions')
const passport = require('passport')
require('../passport/passport')
const http = require('http').createServer(app)
const PORT = process.env.PORT || 8080
//const cors = require('cors')
const path = require('path')

const productsRoute = require('./routes/productsRouter')
const cartRoute = require('./routes/cartRouter')
const sessionRoute = require('./routes/sessionRouter')
const carouselRoute = require('./routes/carouselRouter')

//app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())

//Session Setup
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: config.MONGOATLAS,
            mongoOptions: advancedOptions,
            ttl: 500,
            collectionName: 'sessions',
        }),
        secret: 'shhh',
        resave: true,
        saveUninitialized: false,
        rolling: true,
    })
)
//-----------------------

app.use(passport.initialize())
app.use(passport.session())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'build')))

app.use('/cart', cartRoute)
app.use('/products', productsRoute)
app.use('/session', sessionRoute)
app.use('/carousel', carouselRoute)

//app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, 'build', 'index.html'));
//})


http.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})