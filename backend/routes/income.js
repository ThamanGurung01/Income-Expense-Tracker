const express=require("express");
const {handleGetAllIncomes,handleCreateIncomes,handleUpdateIncome,handleDeleteIncome,handleGetIncome}=require("../controller/income");

const router=express.Router();


router.get("/",handleGetAllIncomes).post("/",handleCreateIncomes).patch("/:id",handleUpdateIncome).delete("/:id",handleDeleteIncome).get("/:id",handleGetIncome);

module.exports=router;
