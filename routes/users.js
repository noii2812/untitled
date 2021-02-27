// var express = require('express');
// const router = express.Router();
// const mongo = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017";
// const dbname = "mydb";
//
// router.get('/get_customers', (req, res, next) => {
//   let result_arr = [];
//   mongo.connect(url, (err, client) => {
//     const db = client.db(dbname);
//     const cursor = db.collection('customers').find();
//     cursor.forEach((doc, err) => {
//       result_arr.push(doc);
//     }, () => {
//       client.close();
//       res.body = result_arr;
//       // console.log(res.body);
//       // res.sendStatus(200).send(res.body);
//       res.json
//       ({'code': res.statusCode, 'body': result_arr});
//       // res.render('./index', {items: result_arr});
//       // return res.body;
//     })
//   })
//
// })
//
// module.exports = router;
