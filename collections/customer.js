const mongoose = require('./config');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    __v: {
        type: Number,
        select: false
    },
},
    {collection: 'customers'}
);

const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;