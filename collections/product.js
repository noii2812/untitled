const mongoose = require('./config');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryId:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:false
    },
    price:{
        type:Number,
        required:true
    },
    wholeSalePrice:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        required:true,
    }
},{collection: 'products'});

const Products = mongoose.model('products', ProductSchema);

module.exports = Products;