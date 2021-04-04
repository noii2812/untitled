const mongoose = require('./config');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    barcode : {
        type : String,
        required : true
    },
    categoryId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdBy : {
        type : String,
    },
    createdAt : {
        type: String
    },
    cost: {
        type: Number,
        required: true,
    },
    qtyOnHand: {
        type: Number,
        default: 0
    },
    minQty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    wholeSalePrice: {
        type: Number,
        required: true
    },
    storeId : {
        type : String,
        required: true
    },
    unit : {
        type : String,
        required : true
    },
    status: {
        type: Boolean,
        required: true,
    }
}, { collection: 'products' });

const Products = mongoose.model('products', ProductSchema);

module.exports = Products;