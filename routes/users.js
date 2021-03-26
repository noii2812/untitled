const express = require('express');
const router = express.Router();
const User = require('../collections/users.js');
const token = require('../provider/authenticate');

router.get('/users', token, (req, res, next) => {
    User.find((err, docs) => {
        if (err) {
            res.json({ 'code': res.statusCode, 'msg': 'err' });
        } else {
            res.json({ 'code': res.statusCode, 'body': docs });
        }
    })
})
router.post('/users', (req, res, next) => {
    User.create(req.body, (err, doc) => {
        if (err) throw err;
        res.json({ 'code': res.statusCode, 'msg': 'user added' });
    })
})
module.exports = router;