const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    content: {
        type: String,
        required: [true,"please tell us about your review"],
        minlength:[50,'please wrtie at 50 char'],
        maxlength:400
    },
    stars: {
        type: Number,
        required: [true,'rate the product'],
        min: [1,'rating can be no longer than 1 star'],
        max: [5,'rating can be no longer than 5']
    },
    author: {
        type: String,
        required: [true,'please provide your name']
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
