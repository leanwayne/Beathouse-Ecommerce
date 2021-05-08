var administrador = true;

function verificar(req, res, next) {
    if (!administrador) {
      res.json({ error: "Acceso denegado, usted no es un administrador" });
    } else {
      next();
    }
}

module.exports = {verificar}
  