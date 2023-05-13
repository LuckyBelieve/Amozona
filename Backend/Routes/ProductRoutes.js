const Router = require('express').Router();
const {allProducts, eachProduct, cartProduct, addAllProducts} = require('../controllers/ProductController')

Router.get("/addAll",addAllProducts);
Router.get('/products',allProducts);
Router.get('/products/slug/:slug',eachProduct);
Router.get('/products/:id',cartProduct);

module.exports = Router;