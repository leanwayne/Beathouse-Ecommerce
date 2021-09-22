const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const model = require('../server/models/modelSchema')
const logger = require('../utils/log4js/log4js')
const bcrypt = require('bcrypt')
const config = require('../config/config')

passport.use('login', new LocalStrategy({passReqToCallback: true}, async function(req, username, password, done) {
    let user = undefined
    try{ //busco usuario
        user = await model.usuarios.findOne({username: username})
    }catch (error) {
        logger.logError.error(error)        
    }
    if(!user) {
        logger.logInfo.info('Usuario incorrecto')
        return done(null, false);
    }      
    const match = await bcrypt.compare(password, user.password)
    if(match) {
        logger.logInfo.info('logeado correctamente')
        return done(null, user)
    }else{
        logger.logInfo.info('constraseña incorrecta')
        return done(null, false)
    }
}))

passport.use('register',new LocalStrategy({passReqToCallback: true}, async function(req, username, password, done) {
    findOrCreateUser = async function() {
        try {//busco usuario
            let respuesta = await model.usuarios.findOne({
                email: req.body.email,
            });
            if(respuesta === null) respuesta = ''
            if(respuesta.email === req.body.email) {
                logger.logInfo.info('usuario ya registrado en MongoDB:',respuesta.username)
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
                    model.usuarios.insertMany(user)
                });
                logger.logInfo.info('nuevo registro completado')
                return done(null, user)
            }  
            return done(null, false)
        }catch(error) {
            logger.logError.error('no se pudo agregar el usuario', error)
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
    let user = {};
    user.username = profile.displayName
    user.id = profile.id
    user.photo = `https://graph.facebook.com/${profile.id}/picture?width=200&height=200&access_token=${accessToken}`
    user.accessToken = accessToken
    user.cart = []
    try { //busco usuario
        const respuesta = await model.usuariosfacebook.findOne({ id: profile.id })
        if(respuesta === null){
            await model.usuariosfacebook.insertMany(user)
            logger.logInfo.info('el usuario agregado es:', user.username)
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
        const usuario = model.usuarios.findOne({ username: username })
        done(null, usuario);
    }catch (error) {
        logger.log.error('DESERIALIZEUSER___', error)
    }
})
