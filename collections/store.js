const mongoose = require('./config');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false
    },
    __v: {
        type: Number,
        select : false
    }
}, {collection : 'store'});

const Store = mongoose.model('store',StoreSchema);

module.exports = Store;