const express = require('express');
const router = express.Router();
const Product = require('../collections/product');
const token = require('../provider/authenticate');
const Mongo = require("mongodb");
const jwt = require('jsonwebtoken');


router.post('/product',(req, res, next) => {
    new Promise((resolve,reject) => {
        Product.create(req.body, (err, docs) => {
            // console.log(req.body);
            if (err){
                reject(err);
            }else{
                resolve(docs);
            }
        });
    }).then(val => {
        res.json({ 'code': 201, 'data': val });
    }).catch(val => {
        res.json({ 'code': 403, 'data': val });
    })
})

//stockin

router.put('/product/remove/:id',token, (req,res,next) => {
    new Promise((resolve,reject) => {
        Product.updateOne({'_id' : Mongo.ObjectID(req.params.id)},{$inc : {'qtyOnHand' : -req.body.out}},(err,pro) => {
            if(err){
                reject(err);
            }else{
                resolve(pro)
            }
        })
    }).then(val => {
        res.json({'code' : 201,'data' : val});
    }).catch(val => {
        res.json({'code' : 403,  'data' : val});
    })
})

router.put('/product/:id',token, (req,res,next) => {
    new Promise((resolve,reject) => {
        Product.updateOne({'_id' : Mongo.ObjectID(req.params.id)},{$inc : {'qtyOnHand' : req.body.in}},(err,pro) => {
            if(err){
                reject(err);
            }else{
                resolve(pro)
            }
        })
    }).then(val => {
        res.json({'code' : 201,'data' : val});
    }).catch(val => {
        res.json({'code' : 403,  'data' : val});
    })
})

router.get('/product/limit=:limit', token, (req, res, next) => {
    let { limit } = req.params;
    // console.log(req.params.limit);
    // console.log(req.params);
    // console.log(req.params.limit);
    Product.find((err, docs) => {
        if (err) throw err;
        res.json({ 'code': res.statusCode, 'body': docs })
    }).limit(+limit)
})

router.get('/product', token,(req, res, next) => {
    // jwt.verify(req.headers['token'], process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //         res.json({'code': 403, 'msg': 'who are you'});
    //     }else{
    new Promise((resolve, reject) => {
        Product.find((err, docs) => {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        })
    }).then(val => {
        res.json({ 'code': 201, 'body': val });
    }).catch(val => {
        res.json({ 'code': 403, 'body': val });
    })
    // Product.find((err, docs) => {
    //         if (err) throw err;
    //         res.json({ 'code': res.statusCode, 'body': docs })
    //         console.log(req.headers['token']);
    //     })
    // }

    // });
})
router.get('/products/:storeId', token, (req, res, next) => {
    Product.aggregate([
        {
        "$project": {
            "_id": 1,
            "name": 1,
            "price": 1,
            "status": 1,
            "wholeSalePrice": 1,
            "categoryObjId": { "$toObjectId": "$categoryId" }
        }
    },
    {
        $lookup: {
            from: 'category',
            localField: 'categoryObjId',
            foreignField: '_id',
            as: 'CategoryDoc'
        }
    },
    {
        $unwind: {
            path: '$CategoryDoc',
            preserveNullAndEmptyArrays: true,
        }
    },
    {
        "$project": {
            "_id": 1,
            "name": 1,
            "price": 1,
            "status": 1,
            "wholeSalePrice": 1,
            "storeObjId": { "$toObjectId": "$CategoryDoc.storeId" }
        }
    },
    {
        $match: {
            "storeObjId": Mongo.ObjectId(req.params.storeId)
        }
    }
    ]).then(r => res.json({ 'code': res.statusCode, 'body': r }));
})
router.get('/product/:categoryId', token, (req, res, next) => {
    new Promise((resolve, reject) => {
        Product.find({"categoryId": Mongo.ObjectID(req.params.categoryId) }, (err, docs) => {
            // console.log(req.params.storeId);
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        })
    }).then(val => {
        res.json({ 'code': 201, 'body': val });
    }).catch(val => {
        res.json({ 'code': 403, 'body': val });
    })
    // Product.find({ "categoryId": Mongo.ObjectID(req.params.categoryId) }, (req, docs) => {
    //     // console.log(req.params.storeId);
    //     res.json({ 'code': res.statusCode, 'body': docs });
    // })
});

module.exports = router;