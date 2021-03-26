const mongoose = require("mongoose");
const provider = require("../provider/db");
require('dotenv').config();
mongoose.connect(process.env.BASE_URL + process.env.DB, { useUnifiedTopology: true });
// mongoose.disconnect();
module.exports = mongoose;