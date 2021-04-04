const mongoose = require('./config');
const bcrypt = require("bcrypt");
const { collection } = require('./category');
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    vendorName: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    companyName: {
        type: String
    },

    tel: {
        type: String

    },
    deliveryTime: {
        type: String

    },
    aba: {

    },
}, { collection: 'vendors' });

const Vendors = mongoose.model('vendors', VendorSchema);

module.exports = Vendors;