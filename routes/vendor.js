const express = require('express');
const router = express.Router();
const Vendor = require('../collections/vendors.js');
const token = require('../provider/authenticate');

router.post('/vendor', token, (req,res,next) => {
    new Promise((resolve,reject) => {
        Vendor.create(req.body,(err,vendor) => {
            if(err){
                reject(err);
            }else{
                resolve(vendor);
            }
        })
    }).then(val => {
        res.json({'code': 201,'data' : val})
    }).catch(val => {
        res.json({'code' : 403,'data' : val})
    })
})

router.get('/vendor', token, (req,res,next) => {
    new Promise((resolve,reject) => {
        Vendor.find((err,vendor) => {
            if(err){
                reject(err);
            }else{
                resolve(vendor);
            }
        })
    }).then(val => {
        res.json({'code': 201,'data' : val})
    }).catch(val => {
        res.json({'code' : 403,'data' : val})
    })
})

module.exports = router;