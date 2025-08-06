const jwt=require("jsonwebtoken");

function verifyUser(req,res,next){
const secret_key=process.env.secret_key;
if(!req.headers["authorization"]) return res.json({tokenError:"header error"});
const authHeader=req.headers["authorization"];
const token = authHeader ? authHeader.split('Bearer ')[1] : null;
if(token){
    jwt.verify(token,secret_key,(err,decoded)=>{
      if (err) {
        console.log("error in verify");
        return res.status(403).json({ tokenError: 'Invalid token' });
      }
      // console.log("Successfull");
      req.user=decoded;
      next();
    });

}else{
return res.status(404).json({tokenError:"no token"});
}
}
module.exports=verifyUser;