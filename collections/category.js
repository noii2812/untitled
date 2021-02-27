const mongoose = require('mongoose');
const schema = mongoose.Schema;
const categorySche = schema({
    name: {type: String, required: true},
    des: {type: String, required: true},
    usable: {type: String, required: true},
});


module.exports = mongoose.model('category', categorySche);