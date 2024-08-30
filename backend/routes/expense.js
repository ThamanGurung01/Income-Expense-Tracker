const express=require("express");
const {handleGetAllExpenses,handleCreateExpenses,handleUpdateExpense,handleDeleteExpense,handleGetExpense}=require("../controller/expense")

const router=express.Router();


router.get("/",handleGetAllExpenses).post("/",handleCreateExpenses).patch("/:id",handleUpdateExpense).delete("/:id",handleDeleteExpense).get("/:id",handleGetExpense);

module.exports=router;
