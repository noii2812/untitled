const express = require('express');
const router = express.Router();
const Mongo = require('mongodb');
const token = require('../provider/authenticate');
const Order = require('../collections/order');

router.post('/order',(req, res, next) => {
    var body = new Order(req.body);
    Order.create(body, (err, doc) => {
        if (err) console.log(err);
        // console.log(req.body)
        res.json({'code': res.statusCode, 'msg': 'New Order'})
    })
})

router.get('/order', (req, res, next) => {
    Order.find(req.body, (err, doc) => {
        if (err) throw err;
        res.json({'code': res.statusCode, 'body': doc})
    })
})

router.get('/orderDetails',(req, res, next) => {
    Order.aggregate(
        [
            {
                $lookup : {
                    from: 'users',
                    localField: 'orderBy',
                    foreignField: '_id',
                    as: 'OrderDoc'
                },
            }  ,
            {
                $unwind: {
                    path: '$OrderDoc',
                    preserveNullAndEmptyArrays: true,
                }

            },
            {
                $unwind: {
                    path: '$products',
                    preserveNullAndEmptyArrays: true,
                }
            },
            {
                $lookup:{
                    from: 'products',
                    localField: 'products.prodcutId',
                    foreignField : '_id',
                    as: 'ProuductDoc'
                }
            },
            {
                $unwind: {
                    path: '$ProuductDoc',
                    preserveNullAndEmptyArrays: true,
                }
            },
        ]
    ,(err,doc) => {
            res.json({'code': res.statusCode, 'body': doc})
        })
})
//confirmOrder
router.put('/order/:_id', (req, res, next) => {
    Order.updateOne({'_id': Mongo.ObjectID(req.params._id)}, {$set: {'isConfirmed': true}}, (err, doc) => {
        if (err) throw err;
        res.json({'code': res.statusCode, 'body': doc})
    });
})


module.exports = router;