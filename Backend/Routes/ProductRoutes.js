const Router = require('express').Router();
const {allProducts} = require('../controllers/ProductController')

Router.get('/products',allProducts);

module.exports = Router;