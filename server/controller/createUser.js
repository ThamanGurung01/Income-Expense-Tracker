const User=require("../model/user");
async function handleCreateUser(req,res){
  try{
    const {name,email,password}=req.body;
    if(!name||!email||!password) return res.status(400).json({error:"Input all fields"});
    const user=await User.create({name,email,password});
  return res.status(200).json({msg:"Successfully created"});
  }catch(error){
    return res.status(500).json({error:"Server Error"});
  }
}
module.exports={handleCreateUser};