const express = require('express');
const router = express.Router();
const Store = require('../collections/store.js');
const token = require('../provider/authenticate');

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