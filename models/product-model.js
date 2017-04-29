const mongoose = require('mongoose');

const Review = require('./review-model.js');

const Schema = mongoose.Schema;


const productSchema = new Schema({
  name: { type: String,
    required: [true, 'Please give the product name.']
   },
  price: { type: Number, default: 0 },
  imageUrl: {
    type: String,
     default: '/images/box.gif',
     //              example.com   blah.gif
    //  match: /^https?:\/\/\w+\.\w+(\/\w+)*\/\w+\.\w+/
    },
  description: { type: String },
     // Review as an array of SUBDOCUMENTS of Product
  reviews: [ Review.schema ],
  category: {
    type: String,
    enum: ['Games', 'Music', 'Movies', 'Books', 'Cookware']
  }

});

const Product = mongoose.model('Product', productSchema);


module.exports = Product;
