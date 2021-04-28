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

router.get('/transactions',token,(req,res,next) => {
    new Promise((resolve,reject) => {
        Transaction.aggregate([
            {
                $project: {
                    "_id": 1,
                    "productId": 1,
                    "vendorId": 1,
                    "optionId": 1,
                    "in": 1,
                    "out": 1,
                    "productObjId": { "$toObjectId": "$productId" }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productObjId',
                    foreignField: '_id',
                    as: 'ProductDoc'
                }
            },
            {
                $unwind: {
                    path: '$ProductDoc',
                    preserveNullAndEmptyArrays: true,
                }
            },
            {
                $project: {
                    "_id": 1,
                    "productId": 1,
                    "vendorId": 1,
                    "optionId": 1,
                    "in": 1,
                    "out": 1,
                    "ProductDoc": 1
                }
            },
        ],(err,trans) => {
            if(err){
                reject(err)
            }else{
                resolve(trans)
            }
        })
    }).then(val =>{ 
        res.json({'code' : 201,'data' :val})
    }).catch(val => {
        res.json({'code' : 201,'data' : val})
    })
})


module.exports = router;

