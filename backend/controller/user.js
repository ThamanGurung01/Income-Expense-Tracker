const mongoose=require("mongoose");
const User=require("../model/user");

async function handleGetAllUser(req,res){
  try{
    const allUsers=await User.find({}).sort({createdAt:-1});
    if(allUsers.length===0) return res.status(404).json({error:"No data"});
  return res.status(200).json(allUsers); 
  }catch(error){
    res.status(500).json({error:"Server error"});
  }
}

async function handleCreateUser(req,res){
  try{
    const {name,email,password}=req.body;
    if(!name||!email||!password) return res.status(400).json({error:"Input all fields"});
    await User.create({name,email,password});
  return res.status(200).json({msg:"Successfully created"});
  }catch(error){
    return res.status(500).json({error:"email already exists"});
  }
}

async function handleUpdateUser(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({error:"No id"});
    const {name,email,password}=req.body;
    if(!name||!email||!password) return res.status(400).json({error:"Input all fields"});
      await User.findByIdAndUpdate(id,{name,email,password});
      return res.status(200).json({msg:"Successfully updated"});
  }catch(error){
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
    return res.status(500).json({error:"Server error"});
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

module.exports={handleGetAllUser,handleCreateUser,handleUpdateUser,handleDeleteUser,handleGetUser}