const joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

const User = mongoose.model("user", userSchema);

const validateUser = (item) => {
  const schema = joi.object({
    // name:joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    // isAdmin:joi.boolean()
  });
  return schema.validate(item);
};
module.exports = { User, validateUser };
