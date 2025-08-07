const mongoose=require("mongoose");
const User=require("../model/user");
const jwt = require("jsonwebtoken");

async function handleGetAllUser(req,res){
  try{
    const allUsers=await User.find({}).sort({createdAt:-1});
    if(allUsers.length===0) return res.status(404).json({error:"No data"});
  return res.status(200).json(allUsers); 
  }catch(error){
    res.status(500).json({error:"Server error"});
  }
}

async function handleUpdateUser(req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "No id" });

    const { name, password } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (password) updateFields.password = password;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }
    await User.findByIdAndUpdate(id, updateFields);

    const updatedUser = await User.findById(id);
    const payload = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
    const secretKey = process.env.secret_key;
    const newToken = jwt.sign(payload, secretKey);

    return res.status(200).json({ msg: "Successfully updated", token: newToken });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: "Invalid ID format" });
    }
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function handleDeleteUser(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({error:"No id"});
    const deleteUser =await User.findByIdAndDelete(id);
    if(!deleteUser) return res.status(404).json({error:"No data found"});
 return res.status(200).json({msg:"Successfully deleted"});
  }catch(error){
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
    return res.status(500).json({error:"Server error"});
  }
}

async function handleGetUser(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({error:"No id"});
   const getUser= await User.findById(id);
   if(!getUser) return res.status(404).json({error:"No data found"});
 return res.status(200).json(getUser);
  }catch(error){
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
   return res.status(500).json({error:"Server error"});
  }
}

async function handleGetUserAuth(req, res) {
  try {
    const token=req.user;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    return res.status(200).json({
      id: token.id,
      name: token.name,
      email: token.email,
    });

  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}


module.exports={handleGetAllUser,handleUpdateUser,handleDeleteUser,handleGetUser,handleGetUserAuth}