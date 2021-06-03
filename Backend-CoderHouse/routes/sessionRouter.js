const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController")
const passport = require("passport")

//-login
router.post("/login", passport.authenticate('login'), logController.logIn)
router.get("/login", logController.showLogIn)

//-login-Facebook
router.get("/facebook", passport.authenticate("facebook" ),(req,res)=>{
    console.log("desde FACEBOOK",req.profile,req.user)
});
router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/ErrorRedSocialPage' ,successRedirect:'http://localhost:3000/logged'}), logController.showLogIn);

//-register
router.get("/register",  logController.showRegister);
router.post("/register", passport.authenticate('register'), logController.register);

//-logout
router.get("/logout", logController.logOut)


module.exports = router;