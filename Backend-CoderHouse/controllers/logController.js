module.exports = {
    logIn: (req, res) => {
        const nombre = req.body.nombre
        req.session.nombre = nombre
        console.log("DESDE POST",req.session)
        res.status(200).json(req.session.nombre)        
    },

    logInRead: (req, res) => {
        console.log("DESDE GET", req.session)
        if(req.session.nombre){
            const nombre = req.session.nombre
            return res.status(200).json(req.session.nombre) 
        }else{
            return res.status(400).json({error:"usuario no identificado"})
        }
    },

    logOut: (req, res) => {
        let nombre = req.session.nombre? req.session.nombre: ''
        if(nombre) {
            req.session.destroy(err => {
                res.status(200).send(err)            
            })  
        }
    }
}