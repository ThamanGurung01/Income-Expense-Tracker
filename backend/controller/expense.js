const mongoose=require("mongoose");
const EXPENSE=require("../model/expense");

async function handleGetAllExpenses(req,res){
  try{
    const allExpenses=await EXPENSE.find({});
    if(allExpenses.length===0) return res.status(404).json({msg:"no data"});
  return res.json(allExpenses); 
  }catch(error){
    res.status(500).json({error:"server error"});
  }
}

async function handleCreateExpenses(req,res){
  try{
    const {expense_amount,expense_category,expense_description,expense_date}=req.body;
    // console.log(req.body);
    if(!expense_amount||!expense_category||!expense_date) return res.status(400).json({msg:"Input all fields"});
    if(Number(expense_amount)>=0){
    await EXPENSE.create({expense_amount,expense_category,expense_description,expense_date});
  return res.status(200).json({msg:"successfully created"});
}else{
  return res.status(400).json({msg:"must be greater than or equal to 0"});
}
  }catch(error){
    return res.status(500).json({error:error});
  }
}

async function handleUpdateExpense(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({msg:"error: no id"});
    const {expense_amount,expense_category,expense_description,expense_date}=req.body;
    if(!expense_amount&&!expense_category&&expense_date) return res.status(400).json({msg:"error: Input all fields"});
    if(Number(expense_amount)>=0){
      await EXPENSE.findByIdAndUpdate(id,{expense_amount,expense_category,expense_description,expense_date});
      return res.status(200).json({msg:"successfully updated"});
    }else{
      return res.status(400).json({msg:"must be greater than or equal to 0"});
    }
  }catch(error){
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
    return res.status(500).json({error:"server error"});
  }
}

async function handleDeleteExpense(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({msg:"error: no id"});
    const deleteExpense =await EXPENSE.findByIdAndDelete(id);
    if(!deleteExpense) return res.status(404).json({msg:"no data found"});
 return res.status(200).json({msg:"successfully deleted"});
  }catch(error){
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
    return res.status(500).json({error:"server error"});
  }
}

async function handleGetExpense(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({msg:"error: no id"});
   const getExpense= await EXPENSE.findById(id);
   if(!getExpense) return res.status(404).json({msg:"no data found"});
 return res.status(200).json(getExpense);
  }catch(error){
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
   return res.status(500).json({error:"server error"});
  }
}

module.exports={handleGetAllExpenses,handleCreateExpenses,handleUpdateExpense,handleDeleteExpense,handleGetExpense}