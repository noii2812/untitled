const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const Mongo = require("mongodb");
const url = require('../provider/db').url;
const dbname = require('../provider/db').dbname;
const Customer = require('../collections/customer');
const token = require('../provider/authenticate');

router.post('/customer', token, (req, res, next) => {
    const body = new Customer(req.body);
    Customer.create(body, (err, doc) => {
        res.json({'code' : res.statusCode, 'msg' : !err ? 'customer added' : 'err' })
    });
    // mongo.connect(url, (err, client) => {
    //     const db = client.db(dbname);
    //     db.collection('customers').insertOne(req.body, (err, res) => {
    //         // console.log('data inserted');
    //     });
    //     client.close();
    // });
    // res.json({'code': res.statusCode});
    // // res.redirect('/')
});

router.get('/customer', (req, res, next) => {
    let result_arr = [];
    mongo.connect(url, (err, client) => {
        const db = client.db(dbname);
        const cursor = db.collection('customers').find();
        cursor.forEach((doc, err) => {
            result_arr.push(doc);
        }, () => {
            client.close();
            res.body = result_arr;
            // console.log(res.body);
            // res.sendStatus(200).send(res.body);
            res.json
            ({'code': res.statusCode, 'body': result_arr});
            res.render('index', {items: result_arr});
            // return res.body;
        })
    })

})
router.post('/user/update/:id', (req, res, next) => {
    const item = {
        "name": req.body.name,
        "age": req.body.age,
        "sex": req.body.sex
    };
    const id = req.params.id;
    mongo.connect(url, (err, client) => {
        const db = client.db(dbname);
        db.collection('customers').updateOne({'_id': Mongo.ObjectID(id)}, {$set: item}, (err, res) => {
            client.close();
        });
        res.redirect('/get_customers');
    });
})
router.get('/delete/:id', (req, res, next) => {
    mongo.connect(url, (err, client) => {
        const db = client.db(dbname);
        // const id = req.params.id;
        db.collection('customers').deleteOne({'_id': Mongo.ObjectID(req.params.id)}, (err, result) => {
            res.json({success: id})
            client.close();
        });
        // res.redirect('/get_customers');
    })
});


module.exports = router;