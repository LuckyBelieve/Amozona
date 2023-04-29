const {data} = require('../data');

module.exports.allProducts = (req,res)=>{
    res.send(data.products);
}