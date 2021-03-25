const customerRoute = require('./routes/customers');
const categoryRoute = require('./routes/category');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/users');
const storeRoute = require('./routes/store');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/order');
module.exports = [
    customerRoute,
    categoryRoute,
    loginRoute,
    userRoute,
    storeRoute,
    productRouter,
    orderRouter
];
