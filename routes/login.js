const jwt = require("jsonwebtoken");
const express = require('express');
const mongo = require('mongodb').MongoClient;
const router = express.Router();
const User = require('../collections/users');
const bcrypt = require('bcrypt');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

// router.post('/login', (req, res) => {
//     // Read username and password from request body
//     const { username, password } = req.body;
//     // var user = [];
//     // var pwd;
//     new Promise((resolve, reject) => {
//         User.findOne({ username: username }, (err, user) => {
//             user.comparePassword(password, (err, isMatch) => {
//                 // if (err) throw err;
//                 if (isMatch) {
//                     const accessToken = jwt.sign({ username: user.username, role: user.role, }, secret, { expiresIn: '2d' });
//                     res.json({
//                         'code': res.statusCode,
//                         'name': user['username'],
//                         'msg': 'Login Successfully',
//                         accessToken,
//                     });
//                 } else {
//                     res.send('Username or password incorrect');
//                 }
//             });
//             // console.log(docs.map((e) => e['username']));
//             // user = docs.filter((e) => e['username'] === username && e['password'] === pwd);
//             // if (user.length == 1) {
//             //     // Generate an access token
//             //
//             // } else {
//             //
//             // }
//         })
//     });
//     // Filter user from the users array by username and password

//     // return u['username'] === username && u[password] === password
//     // });
// });

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if(user){
                user.comparePassword(password, (error, isMatch) => {
                    if (error) {
                        reject(error);
                    } else {
                        const accessToken = jwt.sign({username: user.username,role: user.role},secret,{expiresIn : '2d'});
                        const val = {
                            'code': 201,
                            'data': user,
                            'msg': 'Login Successfully',
                            accessToken,
                        }
                        resolve(val);
                    }
                })
            }else{
                reject(err);
            }
        })
    }).then(val => { 
        res.send(val);
    }).catch(val => {
        res.send({'code' : 403,'data' : 'Error'})
    }
)})

module.exports = router;