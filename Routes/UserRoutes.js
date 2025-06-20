const express =require("express");
const router = express.Router();


//InsertModel
const User = require("../Model/UserModel")
const UserControllers = require("../Controllers/UserControllers");


router.get("/",UserControllers.getAllUsers);

module.exports = router;