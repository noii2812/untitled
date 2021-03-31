const express = require('express');
const router = express.Router();
const Store = require('../collections/store.js');
const token = require('../provider/authenticate');

router.post('/store', (req, res, next) => {
    Store.create(req.body, (err, docs) => {
        console.log(req.body);
        if (err) throw err
        res.json({ 'code': res.statusCode, 'msg': 'Store Inserted' });
    });
})

router.get('/store', token, (req, res, next) => {
    Store.find((err, docs) => {
        if (err) {
            res.json({ 'code': res.statusCode, 'err': err.msg });
        } else {
            res.json({ 'code': res.statusCode, 'body': docs });
        }
    });
});

module.exports = router;