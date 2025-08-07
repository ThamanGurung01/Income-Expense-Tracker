const express=require("express");
const {handleGetAllUser,handleUpdateUser,handleDeleteUser,handleGetUser}=require("../controller/user");

const router=express.Router();

router.get("/",handleGetAllUser).patch("/:id",handleUpdateUser).delete("/:id",handleDeleteUser).get("/:id",handleGetUser);
module.exports=router;
