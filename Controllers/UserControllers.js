const { get } = require("mongoose");
const User = require("../Model/UserModel");

const getAllUsers = async(req,res,next) =>{

    let Users;

    try{
        Users = await User.find();
    }catch(err){
        console.log(err);
    }
    //not found
    if(!Users){
        return res.status(404).json({message:"User not found"});
    }
    //Display all users
    return res.status(200).json({Users})
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
}



exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;