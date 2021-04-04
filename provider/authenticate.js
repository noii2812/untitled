
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['token'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
        res.json({'code' : 403,'err' : 'err'})
    }

}

module.exports = verifyToken;