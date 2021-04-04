const express = require('express');
const router = express.Router();
const Transaction = require('../collections/transaction.js');
const token = require('../provider/authenticate');


router.post('/stock',token, (req,res,next) => {
    new Promise((resolve,reject) => {
        Transaction.create(req.body,(err,trans) => {
            if(err){
                reject(err)
            }else{
                resolve(trans);
            }
        })
    }).then(val => {
        res.json({'code': 201, 'data' : val})
    }).catch(val => {
        res.json({'code' : 403,'data' : val})
    })
})

router.get('/stock',token, (req,res,next) => {
    new Promise((resolve,reject) => {
        Transaction.find((err,trans) => {
            if(err){
                reject(err)
            }else{
                resolve(trans);
            }
        })
    }).then(val => {
        res.json({'code': 201, 'data' : val})
    }).catch(val => {
        res.json({'code' : 403,'data' : val})
    })
})



module.exports = router;

