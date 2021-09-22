const DAO = require('../models/cartDAO')

module.exports = {
    logIn: (req, res) => {
        if(req.session){
           return res.status(200).json(req.session)
        }else{
            return res.starus(400).json({error:'usuario no logeado'})
        }
    },

    showLogIn: async (req, res) => {
        if(req.session.passport){
            try {
                const userInfo = await DAO.findUser(req.session.passport.user._id) // info del user  
                return res.status(200).json(userInfo)       
            }catch (error) { 
                return res.status(400).send(error)
            }  
        }else{
            return res.status(400).send('no se encontro la session')
        }
    },

    logOut: (req, res) => {
        try {
            if(req.session) return req.session.destroy(err => res.status(200).json(err))    
        } catch (error){      
            return res.status(400).send('no se encontro la session')
        }
    },

    register: async (req, res) => {  
        console.log('desde ruta register SESSION',req.session)
        res.status(200).json(req.session)
    },
}