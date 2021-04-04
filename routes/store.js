const express = require('express');
const router = express.Router();
const Store = require('../collections/store.js');
const token = require('../provider/authenticate');


router.post('/store', (req, res, next) => {
    new Promise((resolve,reject) => {
        Store.create(req.body,(err, store) => {
            if(err){
                reject(err);
            }else{
                resolve(store)
            }
        })
    }).then(val => {
        res.json({'code' : 201,'data' : val})
    }).catch(val => {
        res.json({'code' : 403, 'data' : val});
    })
    // Store.create(req.body, (err, docs) => {
    //     console.log(req.body);
    //     if (err) throw err
    //     res.json({ 'code': res.statusCode, 'msg': 'Store Inserted' });
    // });
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