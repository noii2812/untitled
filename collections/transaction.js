const mongoose = require('./config');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    productId: {
        type: String,
        required: true,
    }, 
    vendorId: {
        type: String,
    },
     optionId: {
        type: String,
    },
     in: {
        type: Number
    },
     out: {
        type: Number,
    },
     storeId: {
        type: String
    },
     modifiedBy: {
        type: String,
        required: true
    },
     desc: {
        type: String
    },
     timestamp: {
        type: String,
        required: true
    }

}, { collection: 'transaction' });

const Transaction = mongoose.model('transaction', TransactionSchema);
module.exports = Transaction;
