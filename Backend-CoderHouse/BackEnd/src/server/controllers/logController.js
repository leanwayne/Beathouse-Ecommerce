module.exports = {
    logIn: (req, res) => {
        if(req.session){
           return res.status(200).json(req.session)
        }else{
            return res.starus(400).json({error:'usuario no logeado'})
        }
    },

    showLogIn: (req, res) => {
        if(req.session.passport){
            return res.status(200).send(req.session.passport)
        }else{
            return res.status(400).send('no se encontro la session')
        }
    },

    logOut: (req, res) => {
        if(req.session) {
            return req.session.destroy(err => res.status(200).send('sesion terminada'))
        }
        return res.status(200).json(req.session)
    },

    register: async (req, res) => {  
        console.log('desde ruta register SESSION',req.session)
        res.status(200).json(req.session)
    },
}