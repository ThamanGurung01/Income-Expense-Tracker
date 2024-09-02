const express=require("express");
const {handleGetAllUser,handleCreateUser,handleUpdateUser,handleDeleteUser,handleGetUser}=require("../controller/user");

const router=express.Router();


router.get("/",handleGetAllUser).post("/",handleCreateUser).patch("/:id",handleUpdateUser).delete("/:id",handleDeleteUser).get("/:id",handleGetUser);

module.exports=router;
