const mongoose = require('./config');
const schema = mongoose.Schema;

const categorySche = schema({
        name: {
            type: String,
            required: true
        },
        des: {
            type: String,
            required: true
        },
        usable: {
            type: Boolean,
            required: true
        },
        storeId: {
            type: String,
            require: true
        },
        __v: {
            type: Number,
            select: false
        }
    },
    // {versionKey: false},
    { collection: 'category' },
);

// categorySche.set('toObject', {
//     transform: function (doc, ret) {
//         ret.id = ret._id
//         delete ret._id
//         delete ret.__v
//     }
// })

const Category = mongoose.model('category', categorySche);

module.exports = Category;