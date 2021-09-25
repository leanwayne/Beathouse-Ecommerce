const express = require('express')
const router = express.Router()
const sessionController = require('../controllers/sessionController')
const passport = require('passport')


router.post('/login', passport.authenticate('login'), sessionController.logIn)
router.get('/login', sessionController.showLogIn)
//-login-Facebook-----------
router.get('/facebook', passport.authenticate('facebook' ),(req,res)=>{
    console.log('desde FACEBOOK',req.profile,req.user)
});
router.get('/auth/facebook/callback',passport.authenticate('facebook', {failureRedirect: 'http://localhost:3000/ErrorRedSocialPage' ,successRedirect:'http://localhost:3000/logged'}), sessionController.showLogIn)
//--------------------------
router.post('/register', passport.authenticate('register'), sessionController.register)
router.get('/logout', sessionController.logOut)

module.exports = router