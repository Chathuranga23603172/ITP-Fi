const express =require("express");
const router = express.Router();


//InsertModel
const User = require("../Model/UserModel")
const UserControllers = require("../Controllers/UserControllers");


router.get("/",UserControllers.getAllUsers);
router.post("/",UserControllers.addUsers);
router.get("/:id",UserControllers.getById);
router.put("/:id",UserControllers.updateUser);
router.delete("/:id",UserControllers.deleteUser);

module.exports = router;