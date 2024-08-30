const mongoose=require("mongoose");
const expenseSchema=mongoose.Schema({
  expense_title:{
    type:String,
    required:true,
  },
  expense_category:{
    type:String,
    required:true,
  },
  expense_description:{
    type:String,
  },
  expense_date:{
    type:Date,
    required:true,
  },
},{timestamps:true});

const Expense=mongoose.model("expenses",expenseSchema);
module.exports=Expense;