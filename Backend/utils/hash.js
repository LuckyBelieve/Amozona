const bycrypt = require("bcrypt");
const genSalt = 10;
const hashPassword = async (password)=>{
    const hashed = await bycrypt.hash(password,genSalt);
    return hashed;
}
module.exports = hashPassword;