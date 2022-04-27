const express = require('express');
const Category = require('../collections/category');
const Mongo = require("mongodb");
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const url = require('../provider/db').url;
const dbname = require('../provider/db').dbname;
const mongoose = require("../collections/config");
const token = require('../provider/authenticate');
const { MongoClient } = require('mongodb');

router.post('/category', token, (req, res, next) => {
    const body = new Category(req.body);
    new Promise((resolve,reject) => {
        Category.create(req.body,(err,cat) => {
            if(err){
                reject(err);
            }else{
                resolve(cat);
            }
        })
    }).then(val => {
        res.json({'code' : 201, 'data' : val})
    }).catch(val => {
        res.json({'code' : 403, 'data' : val})
    })
});



router.get('/category/:id',token, (req,res,next) => {
    new Promise((resolve,reject) => {
        Category.findOne({'_id' : Mongo.ObjectID(req.params.id)},(err,cat) => {
            if(err){
                reject(err);
            }else{
                resolve(cat);
            }
        })
    }).then(val => {
        res.json({'code' : 201, 'data' : val});
    }).catch(val => {
        res.json({'code': 403, 'data' : val});
    })
})

router.get('/category', token, ((req, res, nex) => {
    new Promise((resolve,reject) => {
        Category.find((err,cat) => {
            if(err){
                reject(err);
            }else{
                resolve(cat);
            }
        })
    }).then(val => {
        res.json({'code' : 201 , 'data' : val})
    }).catch(val => {
        res.json({'code': 403 , 'data' : val});
    })
    // Category.find((err1, docs) => {
    //     console.log(docs);
    //     res.json({ 'code': res.statusCode, 'body': docs })
    // })
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
    new Promise((resolve, reject) => {
        Category.updateOne({ "_id": Mongo.ObjectId(req.params.id) }, { $set: req.body }, (err, cat) => {
            if (err){
                reject(err);
            }else{
                resolve(cat);
            }
        })
    
    }).then(val => {
        res.json({ "code": 201, "msg": "document updated" , "data" : val })

    }).catch(val => {
        res.json({ "code": 403, "msg": "error" , "data" : val })
    })
}));

module.exports = router;