const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController")
const passport = require("passport")

//-login
router.post("/login", passport.authenticate('login'), logController.logIn)
router.get("/login", logController.showLogIn)

//-login-Facebook
router.get("/facebook", passport.authenticate("facebook", { scope : ['email'] }),logController.logIn);
router.get("/facebook/callback", passport.authenticate("facebook", { scope : ['email'] }),logController.showLogIn);

//-register
router.get("/register",  logController.showRegister);
router.post("/register", passport.authenticate('register'), logController.register);

//-logout
router.get("/logout", logController.logOut)


module.exports = router;