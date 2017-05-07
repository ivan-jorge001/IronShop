const express = require('express');
const reviewRoutes = express.Router();
const Product = require('../models/products-models.js');
const Review = require('../models/review-model.js');


reviewRoutes.get('/product/:id/reviews/new', (req, res, next) => {
    console.log(req.params.id);
    const productId = req.params.id;

    Product.findById(productId, (err, theProduct) => {
        if (err) {
            next(err);
            return;
        }
        res.render('reviews-views/new-review-view.ejs', {
            product: theProduct
        });
    });

});


reviewRoutes.post('/product/:id/reviews', (req, res, next) => {
    const productId = req.params.id;
    Product.findById(productId, (err, theProduct) => {
        const thereview = new Review({
            content: req.body.reviewContent,
            stars: req.body.reviewStars,
            author: req.body.reviewAuthor
        });
        theProduct.reviews.push(thereview);

        theProduct.save((err) => {
            if (err) {
                res.render('reviews-views/new-review-view.ejs', {
                  product:theProduct,
                  validationErrors: theProduct.errors
                });
                return;
            }
            res.redirect(`/products/${productId}`);
          });
    });
});

module.exports = reviewRoutes;
