const express=require("express");
const { handleLogin } = require("../controller/login");

const router=express.Router();
router.post("/",handleLogin);

module.exports=router;
