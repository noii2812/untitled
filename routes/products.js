const express = require('express');
const router = express.Router();
const Product = require('../collections/product');
const token = require('../provider/authenticate');
const Mongo = require("mongodb");
const jwt = require('jsonwebtoken');


router.post('/product', (req, res, next) => {
    Product.create(req.body, (err, docs) => {
        console.log(req.body);
        if (err) throw err
        res.json({ 'code': res.statusCode, 'msg': 'Product Inserted' });
    });
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

router.get('/product', (req, res, next) => {
    // jwt.verify(req.headers['token'], process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //         res.json({'code': 403, 'msg': 'who are you'});
    //     }else{
    Product.find((err, docs) => {
            if (err) throw err;
            res.json({ 'code': res.statusCode, 'body': docs })
            console.log(req.headers['token']);
        })
        // }

    // });
})
router.get('/products/:storeId', token, (req, res, next) => {
    Product.aggregate([{
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
    Product.find({ "categoryId": Mongo.ObjectID(req.params.categoryId) }, (req, docs) => {
        // console.log(req.params.storeId);
        res.json({ 'code': res.statusCode, 'body': docs });
    })
});

module.exports = router;