const mongoose = require('./config');
const Schema = mongoose.Schema;

const StockOutOptionSche = new Schema({
    name : {
        type: String,
        required: true,
    },
    des : {
        type: String
    },
    createdAt : {
        type: String,
    },
    createdBy : {
        type: String,
        // required: true
    }
},{collection : 'stockoutoption'})

const StockOutOption = mongoose.model('stockoutoption' , StockOutOptionSche)
module.exports = StockOutOption;