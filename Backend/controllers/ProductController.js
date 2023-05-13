const { data } = require('../data');
const Product = require('../models/ProductModel');

module.exports.addAllProducts =  async(req,res)=>{
    try {
        const addedProducts = await Product.insertMany(data.products);
        if(addedProducts){
            res.status(201).send(addedProducts);
        }
    
    } catch (error) {
        console.log(error.message);
    }
}
// get all products

module.exports.allProducts = async (req,res)=>{
    try {
        const allProducts = await Product.find();
        if(allProducts){
            res.status(201).send(allProducts);
        }
    } catch (err) {
        console.log(err.message);
    }
}
module.exports.eachProduct = async (req,res)=>{
    try {
        const product = await Product.findOne({slug:req.params.slug});
        if(product){
            res.send(product).status(201);
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(404).send({message:"product not found"})
    }
}
module.exports.cartProduct = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            res.send(product).status(201);
        }
    } 
    catch (err) {
        console.log(err.message);
        res.status(404).send({message:"product not found"})
    }
}