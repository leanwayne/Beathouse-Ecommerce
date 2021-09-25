function verify(req, res, next) {
    if (!req.session.passport) {
        res.send('log in to use this path')
    }else {
        next()
    }
}
module.exports = {verify}