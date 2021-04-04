const express = require('express');
const router = express.Router();
const User = require('../collections/users.js');
const token = require('../provider/authenticate');

router.get('/users', token, (req, res, next) => {
    new Promise((resolve,reject) => {
        User.find((err, docs) => {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        })
    }).then(val => {
        res.json({ 'code': 201, 'body': val });
    }).catch(val => {
        res.json({'code': 403 , 'body' : val});
    })
    
})

router.post('/users', (req, res, next) => {
    User.create(req.body, (err, doc) => {
        if (err) {
            res.json({ 'err': err.message });
        };
        res.json({ 'code': res.statusCode, 'msg': 'user added' });
    })
});


module.exports = router;