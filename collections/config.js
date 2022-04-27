const mongoose = require("mongoose");
const provider = require("../provider/db");
require('dotenv').config();
mongoose.connect(process.env.BASE_URL + process.env.DB, { useNewUrlParser: true});
// mongoose.disconnect();
module.exports = mongoose;