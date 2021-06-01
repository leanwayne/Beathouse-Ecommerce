module.exports = {
    logIn: (req, res) => {
        console.log("DESDE POST",req.session)
        res.status(200).json(req.session)
    },

    showLogIn: (req, res) => {
        console.log("DESDE GET", req.session)
        return res.status(200).json(req.session)
    },

    logOut: (req, res) => {
        if(req.session) {
            return req.session.destroy(err => res.status(200).send(err))
        }
        return res.status(200).json(req.session)
    },

    register: (req, res) => {  
        console.log("desde ruta register SESSION",req.session)
        res.status(200).json(req.session)
    },

    showRegister: (req, res) => { 
        if(req.session.passport){
           return res.status(200).send("okey")
        }else{
            return res.status(400).send("no se encontro la session")
        }
    }
}