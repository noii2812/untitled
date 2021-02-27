const express = require('express');
const categorySchema = require('../collections/category');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbname = 'mydb';
router.post('/category', ((req, res, next) => {
    const body = new categorySchema(req.body);
    mongo.connect(url, (err, client) => {
        const db = client.db(dbname);
        db.collection('category').insertOne(body, (err, res) => {
            // console.log('data inserted');
        });
        client.close();
    });
    // console.log(res);
    res.json({'code': res.statusCode,'msg': res.statusCode == 200 ? 'inserted' :'error'})
    // res.redirect('/category')
}));

router.get('/category',((req,res,nex) => {
    let result= [];
    mongo.connect(url,(err,client) => {
        const db = client.db(dbname);
        const cursor = db.collection('category').find();
        cursor.forEach((doc,err) => {
            result.push(doc);
        },() => {
            client.close();
            res.body = result;
            res.json({'code': res.statusCode,'body':result} )
        })
    })
}));

module.exports = router;
