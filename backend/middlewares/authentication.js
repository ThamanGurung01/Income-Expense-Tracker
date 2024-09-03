const jwt=require("jsonwebtoken");

function verifyUser(req,res,next){
const redirectLoginUrl=process.env.LoginUrl;
const secret_key=process.env.secret_key;
const token=req.cookies.Token;
if(token){
    jwt.verify(token,secret_key,(err,decoded)=>{
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user=decoded;
      next();
    });

}else{
return res.status(404).json({tokenError:"no token"});
}
}
module.exports=verifyUser;