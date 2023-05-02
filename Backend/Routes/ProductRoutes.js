const Router = require('express').Router();
const {allProducts, eachProduct} = require('../controllers/ProductController')

Router.get('/products',allProducts);
Router.get('/products/slug/:slug',eachProduct);

module.exports = Router;