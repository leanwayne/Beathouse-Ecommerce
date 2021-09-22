function verificar(req, res, next) {
    if (!req.session.passport) {
        res.json({ error: "debe iniciar sesion para utilizar esta ruta"})
    }else {
        next()
    }
}

module.exports = {verificar}
  