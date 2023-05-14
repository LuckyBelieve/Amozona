const { addAllUsers, userLogin, getAllUsers } = require("../controllers/userController");

const Router = require("express").Router();

Router.get("/addedUsers",addAllUsers);
Router.post("/login",userLogin);
Router.get("/allUsers",getAllUsers);

module.exports = Router;
