const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const model = require("../models/modelSchema");

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async function (req, username, password, done) {
      let user = undefined;
      //busco usuario
      try {
        user = await model.usuarios.findOne({ username: username });
      } catch (error) {
        console.log("error", error);
      }
      if (!user) {
        console.log("Usuario incorrecto");
        return done(null, false);
      }
      //valido password
      let credencialesOk = user.username === username && user.password === password;
      if (!credencialesOk) {
        console.log("Contraseña incorrecta");
        return done(null, false);
      }
      console.log("logeado correctamente");
      return done(null, user);
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async function (req, username, password, done) {
      findOrCreateUser = async function () {
        //busco usuario
        try {
          let respuesta = await model.usuarios.findOne({
            username: username,
          });
          if (respuesta === null) respuesta = "cosmes";
          if (respuesta.username === username) {
            console.log("usuario ya registrado en MongoDB:",respuesta.username);
            return done(null, false);
          }
        } catch (error) {
          console.log("error aca esta el error ? ", error);
        }
        //sino existe lo creo
        let user = {};
        user.username = username;
        user.password = password;
        try {
          await model.usuarios.insertMany(user);
          const respuesta = await model.usuarios.findOne({username: username,});
          console.log("el usuario agregado es:", respuesta.username);
        } catch (error) {
          console.log("no se pudo agregar el usuario", error);
        }
        console.log("PASSPORT el registo salio BIEN ");
        return done(null, user);
      };
      process.nextTick(findOrCreateUser);
    }
  )
);

passport.use('facebook', new FacebookStrategy({
  clientID: "207795154493928",
  clientSecret: "596c4da172ef69a76a53da86298f8496",
  callbackURL: "http://localhost:8080/session/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'picture.type(large)'],
},async (accessToken, refreshToken, profile, done) => {
  console.log("EL PROFILE DESDE STRATEGY", profile)
  console.log("EL accessToken DESDE STRATEGY", accessToken)
    //creo un user 
    let user = {};
    user.username = profile.displayName;
    user.id = profile.id;
    user.photo = `https://graph.facebook.com/${profile.id}/picture?width=200&height=200&access_token=${accessToken}`
    user.accessToken = accessToken
    //busco usuario    
    try {
      const respuesta = await model.usuariosfacebook.findOne({ id: profile.id });
      if(respuesta === null){
        await model.usuariosfacebook.insertMany(user);
        console.log("el usuario agregado es:", user.username);
        return done(null, user);
      }else{
        console.log("todo salio joyaaaa")
        return done(null, user)
      }
    } catch (error) {
        console.log("error facebook", error);
    }
}))

passport.serializeUser(function (user, done) {
  console.log("SERIALIZEUSER=======",user)
  done(null,user);
});


passport.deserializeUser(function (username, done) {
  //prosible error! corregir
  try {
    const usuario = model.usuarios.findOne({ username: username });
    done(null, usuario);
  } catch (error) {
    console.log("DESERIALIZEUSER___", error);
  }
});
