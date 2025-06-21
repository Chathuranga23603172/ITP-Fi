const { get } = require("mongoose");
const User = require("../Model/UserModel");

const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching users" });
  }

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  return res.status(200).json({ users }); // ✅ lowercase key
};


//insert data
const addUsers = async (req,res,next) =>{
    
    const{name,gmail,age,address} = req.body

    let users;

    try{
        users = new User({name,gmail,age,address});
        await users.save();
    }catch(err){
        console.log(err);
    }

    if(!users){
        return res.status(404).json({message:"unable to add user"});
    }
    return res.status(200).json({ users });

};


//getById
const getById = async (req,res,next) =>{

    const id = req.params.id;


    let user;

    try{
        user = await User.findById(id);
    }catch(err){
        console.log(err);
    }
    //not available users
    if(!user){
        return res.status(404).json({message:"not available user"});
    }
    return res.status(200).json({ user });
};


//update user
const updateUser = async(req,res,next) =>{

    const id = req.params.id;

    const{name,gmail,age,address} = req.body;

    let users;

    try{
        users = await User.findByIdAndUpdate(id,
            {name:name, gmail:gmail, age:age, address:address});
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"not update user"});
    }
    return res.status(200).json({ users });
};


//delete User
const deleteUser = async(req,res,next) => {
    const id = req.params.id;

    let user;


    try{
        user = await User.findByIdAndDelete(id)
    }catch(err){
           console.log(err);
    }
      if(!user){
        return res.status(404).json({message:"unable to delete"});
    }
    return res.status(200).json({ user });

}


exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;