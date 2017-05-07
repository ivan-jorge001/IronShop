const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review-model.js');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true,'Please give a product Name']
    },
    price: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        default: "the img goes here"
        // match: /^http?:\/\/\w+\.\w+(\/\w+)* \/\w+\.\w+$/
    },
    description: {
        type: String
    },
    reviews: [Review.schema],
    category: {
        type: String,
        enum: ['Games', 'Music', 'Movies', 'Books', 'Cookware']
    }

});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
