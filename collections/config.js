const mongoose = require("mongoose");
const provider = require("../provider/db");

mongoose.connect(provider.url+"/"+provider.dbname,{useNewUrlParser : true});
// mongoose.disconnect();
module.exports = mongoose;