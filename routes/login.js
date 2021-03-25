const jwt = require("jsonwebtoken");
const express = require('express');
const mongo = require('mongodb').MongoClient;
const router = express.Router();
const User = require('../collections/users');
const bcrypt = require('bcrypt');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

router.post('/login', (req, res) => {
    // Read username and password from request body
    const {username, password} = req.body;
    var user = [];
    var pwd;

    // Filter user from the users array by username and password
    User.findOne({username: username},(err, user) => {
        user.comparePassword(password,(err,isMatch)=> {
            if(err) throw  err;
            if(isMatch){
                const accessToken = jwt.sign({username: user.username, role: user.role,}, secret, {expiresIn: '60s'});
                res.json({
                    'code': res.statusCode,
                    'name': user['username'],
                    'msg' : 'Login Successfully',
                    accessToken,
                });
            }else{
                res.send('Username or password incorrect');
            }
        });
        // console.log(docs.map((e) => e['username']));
        // user = docs.filter((e) => e['username'] === username && e['password'] === pwd);
        // if (user.length == 1) {
        //     // Generate an access token
        //
        // } else {
        //
        // }
    })
    // return u['username'] === username && u[password] === password
    // });

});

module.exports = router;