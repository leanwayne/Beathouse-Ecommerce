const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const model = require('../server/models/modelSchema')
const logger = require('../utils/log4js/log4js')
const bcrypt = require('bcrypt')
const config = require('../config/config')

passport.use('login', new LocalStrategy({passReqToCallback: true}, async function(req, username, password, done) {
    let user = undefined
    try{ //busco user
        user = await model.users.findOne({username: username})
        console.log(user)
    }catch (error) {
        logger.logError.error(error)        
    }
    if(!user) {
        logger.logInfo.info('wrong user')
        return done(null, false);
    }      
    const match = await bcrypt.compare(password, user.password)
    if(match) {
        logger.logInfo.info('login successfull')
        return done(null, user)
    }else{
        logger.logInfo.info('wrong password')
        return done(null, false)
    }
}))

passport.use('register',new LocalStrategy({passReqToCallback: true}, async function(req, username, password, done) {
    findOrCreateUser = async function() {
        try {//busco user
            let response = await model.users.findOne({
                email: req.body.email,
            })
            if(response === null) response = ''
            if(response.email === req.body.email) {
                logger.logInfo.info('user already exist on MongoDB:',response.username)
                return done(null, false)
            }
        }catch(error) {
            logger.logError.error(error)
        }
        //si no existe lo creo
        let user = {};
        user.username = username
        user.email = req.body.email
        user.cart = []
        user.buyOrders = []     
        try {
            const reg = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(user.email)
            if(reg){
                bcrypt.hash(password, 10).then(function(hash) {
                    user.password = hash
                    model.users.insertMany(user)
                })
                logger.logInfo.info('nuevo registro completado')
                return done(null, user)
            }  
            return done(null, false)
        }catch(error) {
            logger.logError.error('no se pudo agregar el user', error)
            return done(null, false)
        }
    }
    process.nextTick(findOrCreateUser)
}))

passport.use('facebook', new FacebookStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENTSECRET,
    callbackURL: 'http://localhost:8080/session/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'picture.type(large)']
    }, async (accessToken, refreshToken, profile, done) => {
    //creo un user
    let user = {}
    user.username = profile.displayName
    user.id = profile.id
    user.photo = `https://graph.facebook.com/${profile.id}/picture?width=200&height=200&access_token=${accessToken}`
    user.accessToken = accessToken
    user.cart = []
    try { //busco user
        const response = await model.usersfacebook.findOne({ id: profile.id })
        if(response === null){
            await model.usersfacebook.insertMany(user)
            logger.logInfo.info('el user agregado es:', user.username)
            return done(null, user)
        }else{
            return done(null, user)
        }
    }catch (error) {
        logger.logError.error('error facebook', error)
    }
}))

passport.serializeUser(function(user, done) {
    done(null,user);
})

passport.deserializeUser(function(username, done) {
    try {
        const user = model.users.findOne({ username: username })
        done(null, user)
    }catch (error) {
        logger.log.error('DESERIALIZEUSER___', error)
    }
})
