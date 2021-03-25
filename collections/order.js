const mongoose = require('./config');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
        products: {
            type: Array,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now(),
        },
        orderBy: {
            type: String,
            required: true,
        },
        grandTotal: {
            type: Number,
            // required: true
        },
        discount: {
            type: Number,
        },
        isConfirmed: {
            type: Boolean,
            required: true,
        },
        __v: {
            type: Number,
            select: false
        }
    },
    {collection: 'order'}
);

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;
