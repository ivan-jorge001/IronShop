const express = require('express');
const Product = require('../models/products-models.js');
const productRoutes = express.Router();

productRoutes.get('/products', (req, res, next) => {
    Product.find((err, productList) => {
        if (err) {
            next(err);
            return;
        }
        res.render('products/products-list-view.ejs', {
            products: productList
        });

    });

});

productRoutes.get('/products/new', (req, res, next) => {

    res.render('products/new-product-view.ejs');
});

// <form action="products/new" method="post">
//                        |         |
//                        |         |
//              |======== | ===============
productRoutes.post('/products/new', (req, res, next) => {

    const theProduct = new Product({
        name: req.body.productName,
        price: req.body.productPrice,
        imgageUrl: req.body.productImageUrl,
        descriptions: req.body.productDescription
    });
    theProduct.save((err) => {
        if (err) {
            res.render('products/new-product-view.ejs', {
                validationErrors: theProduct.errors
            });
            return;
        }
        res.redirect('/products');
    });



});

//product-details?id =1788
//product-details?id =9788
//product-/1988
//                 product-details
//product-/1988
productRoutes.get('/product/:id', (req, res, next) => {
    // const productId = req.query.id;

    const productId = req.params.id;

    Product.findById(productId, (err, theProduct) => {

        if (err) {
            next(err);
            return;
        }

        // if the product isnt found thats what you gonna do go to 404
        if (!theProduct) {
            next();
            return;
        }
        res.render('products/product-details-view.ejs', {
            product: theProduct
        });
    });
});

productRoutes.get('/product/:id/edit', (req, res, next) => {

    const productId = req.params.id;

    Product.findById(productId, (err, theProduct) => {

        if (err) {
            next(err);
            return;
        }

        // if the product isnt found thats what you gonna do go to 404
        if (!theProduct) {
            next();
            return;
        }
        res.render('products/edit-product-view.ejs', {
            product: theProduct

        });
    });
});


productRoutes.get('/products/expensive',(req,res,next) =>{
Product
.find()
.sort({price:-1})
.limit(10)
.exec((err,productList)=>{
  if (err) {
    next(err);
  }
  res.render('products/expensive-view.ejs',{
    products:productList
  });
});
});
//updating a product in mongo db

productRoutes.post('/products/:id', (req, res, next) => {

    const productId = req.params.id;

    const productChanges = {
        name: req.body.productName,
        price: req.body.productPrice,
        imgageUrl: req.body.productImageUrl,
        descriptions: req.body.productDescription
    };

    Product.findByIdAndUpdate(productId, // find the product by id
        productChanges, //which changes you want to save update part
        (err, theProduct) => {

            if (err) {
                next(err);

                return;
            }
            // res.redirect( `products/${productId}`
            res.redirect(`/products`);
        });
});

productRoutes.post('/product/:id/delete', (req, res, next) => {
    const productId = req.params.id;

    Product.findByIdAndRemove(productId, (err, theProduct) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect('/products');
    });
});
productRoutes.get('/search',(req,res,next)=>{
  const searchTerm = req.query.productSearchTerm;
if (!req.query.productSearchTerm) {
  res.render('products/search-view.ejs');
  return;
}
const searchRegex = new RegExp(searchTerm,'i');
Product.find({name: searchRegex},(err,searchResult)=>{
  if (err) {
    next(err);
    return;
  }
  res.render('products/search-view.ejs',{
    products:searchResult
  });
});


});


module.exports = productRoutes;
