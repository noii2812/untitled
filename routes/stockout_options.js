const express = require('express');
const router = express.Router();
const StockOutOption = require('../collections/stockout_options');
const token = require('../provider/authenticate');


router.post('/option', token, (req, res, next) => {
    new Promise((resolve, reject) => {
        StockOutOption.create(req.body, (err, opt) => {
            if (err) {
                reject(err)
            } else {
                resolve(opt)
            }
        })
    }).then(val => {
        res.json({ 'code': 201, 'data': val })
    }).catch(val => {
        res.json({ 'code': 403, 'data': val })
    })
})

router.get('/option', token, (req, res, next) => {
    new Promise((resolve, reject) => {
        StockOutOption.find((err, opt) => {
            if (err) {
                reject(err)
            } else {
                resolve(opt)
            }
        })
    }).then(val => {
        res.json({ 'code': 201, 'data': val })
    }).catch(val => {
        res.json({ 'code': 403, 'data': val })
    })
})

module.exports = router;