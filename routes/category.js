const express = require('express');
const Category = require('../collections/category');
const Mongo = require("mongodb");
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const url = require('../provider/db').url;
const dbname = require('../provider/db').dbname;
const mongoose = require("../collections/config");
const token = require('../provider/authenticate');

router.post('/category', token, (req, res, next) => {
    const body = new Category(req.body);
    Category.create(body, (err, r) => {
        res.json({ 'code': res.statusCode, 'msg': !err ? 'inserted' : 'err', })
    });
    // mongo.connect(url, (err, client) => {
    //     const db = client.db(dbname);
    //     db.collection('category').insertOne(body, (err, res) => {
    //         // console.log('data inserted');
    //     });
    //     client.close();
    // });
    // res.json({'code': res.statusCode, 'msg': res.statusCode == 200 ? 'inserted' : 'error'})
});

router.get('/category/:storeId', token, (req, res, next) => {
    Category.find({ "storeId": Mongo.ObjectID(req.params.storeId) }, (req, docs) => {
        // console.log(req.params.storeId);
        res.json({ 'code': res.statusCode, 'body': docs });
    })
});

router.get('/category', token, ((req, res, nex) => {
    Category.find((err1, docs) => {
        console.log(docs);
        res.json({ 'code': res.statusCode, 'body': docs })
    })
}));

router.delete('/category/:id', token, (req, res, next) => {
    Category.deleteOne({ '_id': Mongo.ObjectID(req.params.id) }, (err, docs) => {
        res.json({ 'code': res.statusCode, 'msg': 'deleted' });
    });
    // mongo.connect(url, (err, client) => {
    //     const db = client.db(dbname);
    //     db.collection("category").deleteOne({'_id': Mongo.ObjectID(req.params.id)}, (err, res) => {
    //         client.close();
    //     })
    // });
    // res.json({"code": res.statusCode, "msg": ""});
});

router.put('/category/:id', token, ((req, res, next) => {
    Category.updateOne({ "_id": Mongo.ObjectId(req.params.id) }, { $set: req.body }, (err, r) => {
        if (err) throw err;
        res.json({ "code": res.statusCode, "msg": "document updated" })
    })

}));

module.exports = router;