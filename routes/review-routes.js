const express = require('express');

const Product = require('../models/product-model.js');

const newReview = require('../models/review-model.js');

const reviewRoutes = express.Router();


reviewRoutes.get('/products/:productId/reviews/new', (req, res, next) => {
    const myProductId = req.params.productId;

    Product.findById(myProductId, (err, theProduct) => {
        if (err) {
            next(err);
            return;
        }

        res.render('reviews/new-review-view.ejs', {
            product: theProduct

        });
    });
});

reviewRoutes.post('/products/:productId/reviews', (req, res, next) => {
    const myProductId = req.params.productId;

    Product.findById(myProductId, (err, theProduct) => {

        const theReview = newReview({
            content: req.body.reviewContent,
            starts: req.body.reviewStars,
            author: req.body.reviewAuthor
        });
        theProduct.reviews.push(theReview);

        theProduct.save((err) => {
          if (err){
            next(err);
            return;
          }

          res.redirect(`/products/${myProductId}`);
        });
    });
});

module.exports = reviewRoutes;
