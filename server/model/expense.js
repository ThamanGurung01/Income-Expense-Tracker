const mongoose=require("mongoose");
const expenseSchema=new mongoose.Schema({
  expense_amount:{
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
    type:String,
    required:true,
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true,
  },
},{timestamps:true});

const Expense=mongoose.model("expenses",expenseSchema);
module.exports=Expense;