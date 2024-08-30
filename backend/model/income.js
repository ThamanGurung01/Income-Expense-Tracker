const mongoose=require("mongoose");
const incomeSchema=new mongoose.Schema({
  income_amount:{
    type:String,
    required:true,
  },
  income_category:{
    type:String,
    required:true,
  },
  income_description:{
    type:String,
  },
  income_date:{
    type:String,
    required:true,
  },
},{timestamps:true});

const Income=mongoose.model("incomes",incomeSchema);
module.exports=Income;