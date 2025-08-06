const User=require("../model/user");
const jwt=require("jsonwebtoken");
async function handleLogin(req,res){
try{
  const {email,password}=req.body;
  if(!password||!email) return res.status(400).json({error:"Input all fields"});
  const resultData=await User.findOne({email:email,password:password});

  if(resultData){
    const payload={
      id:resultData._id,
      name:resultData.name,
      email:resultData.email,
    };
    const secretKey=process.env.secret_key;
    const token= jwt.sign(payload,secretKey);
    res.status(200).json(token);
  }else{
    return res.status(200).json({error:"Incorrect email or password"});
  }
}catch(error){
  console.log(error);
  return {error:error.message()};
}
}
module.exports={
  handleLogin,
}