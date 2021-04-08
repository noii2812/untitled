const customerRoute = require('./routes/customers');
const categoryRoute = require('./routes/category');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/users');
const storeRoute = require('./routes/store');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/order');
const vendorRouter = require('./routes/vendor');
const transactionRouter = require('./routes/transaction');
const outOptionRouter = require('./routes/stockout_options');
module.exports = [
    customerRoute,
    categoryRoute,
    loginRoute,
    userRoute,
    storeRoute,
    productRouter,
    orderRouter,
    vendorRouter,
    transactionRouter,
    outOptionRouter
];
