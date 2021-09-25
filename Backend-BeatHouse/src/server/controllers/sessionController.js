const DAO = require('../models/cartDAO')

module.exports = {
    logIn: (req, res) => {
        if(req.session){
            console.log(req.session)
           return res.status(200).json(req.session)
        }else{
            return res.starus(400).json({error:'user not logged'})
        }
    },

    showLogIn: async (req, res) => {
        if(req.session.passport){
            console.log(req.session.passport) 
            try {
                const userInfo = await DAO.findUserByName(req.session.passport.user.username) // info del user  
                return res.status(200).json(userInfo)       
            }catch (error) { 
                return res.status(400).send(error)
            }  
        }else{
            return res.status(400).send('session not found')
        }
    },

    logOut: (req, res) => {
        try {
            if(req.session) return req.session.destroy(err => res.status(200).json(err))    
        } catch (error){      
            return res.status(400).send('session not found')
        }
    },

    register: async (req, res) => {  
        if(req.session){
            console.log(req.session)
           return res.status(200).json(req.session)
        }else{
            return res.starus(400).json({error:'user not logged'})
        }
    },
}