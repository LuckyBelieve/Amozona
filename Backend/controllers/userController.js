const {User,validateUser} = require("../models/userModel");
const {data} = require("../data");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports.addAllUsers = async (req,res)=>{
     try {
        const addedUsers = await User.insertMany(data.users);
        if(addedUsers){
            res.status(201).send(addedUsers);
        }
     } catch (err) {
        console.log(err.message);
        res.status(401).send({message:"users not added"});
     }
}   

//logging a user in

module.exports.userLogin = async(req,res)=>{
   const {error} = validateUser(_.pick(req.body,["name","email","password","isAdmin"]));
   if(error)res.status(401).send({message:"user validation failed"});
   const {email,password,isAdmin} = _.pick(req.body,["email","password","isAdmin"])
   try {
      const user = await User.findOne({email});
      if(user && (await bcrypt.compare(password,user.password))){
         res.status(201).send({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:user.generateAuthToken()
         });
      }else{
         req.status(401).send({message:"incorect email or password"});
      }
   } catch (err) {
      res.status(401).send({message:err.message});
   }
}
module.exports.getAllUsers = async(req,res)=>{
   try {
      const allUsers = await User.find();
      if(allUsers){
         res.status(201).send(allUsers);
      }
   } catch (err) {
      res.status(401).send("users not found")
   }
}