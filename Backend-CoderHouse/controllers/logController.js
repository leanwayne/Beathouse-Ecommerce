module.exports = {
    logIn: (req, res) => {
        req.session.nombre = req.body.nombre
        console.log("DESDE POST",req.session)
        res.status(200).json(req.session.nombre)
    },

    logInRead: (req, res) => {
        console.log("DESDE GET", req.session)
        return res.status(200).json(req.session)
    },

    logOut: (req, res) => {
        if(req.session.nombre) {
            return req.session.destroy(err => res.status(200).send(err))
        }
        return res.status(200).json(req.session)
    }
}