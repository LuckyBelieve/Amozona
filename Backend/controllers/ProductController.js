const { data } = require('../data');

module.exports.allProducts = (req,res)=>{
    res.send(data.products);
}
module.exports.eachProduct = (req,res)=>{
    const product = data.products.find(x=>x.slug === req.params.slug);
    if(product){
        res.send(product);
    }else{
      res.status(404).send({message:"product not found"})
    }
}