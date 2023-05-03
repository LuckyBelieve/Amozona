const Router = require('express').Router();
const {allProducts, eachProduct, cartProduct} = require('../controllers/ProductController')

Router.get('/products',allProducts);
Router.get('/products/slug/:slug',eachProduct);
Router.get('/products/:id',cartProduct);

module.exports = Router;