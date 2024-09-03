const mongoose=require("mongoose");
const INCOME=require("../model/income");

async function handleGetAllIncomes(req,res){
  try{
const userID=req.user.id;
if(!userID) return res.status(400).json({error:"login token error"});
const allIncomes=await INCOME.find({author:userID}).sort({createdAt:-1}).populate("author");
    if(allIncomes.length===0) return res.status(200).json([{}]);
  return res.status(200).json(allIncomes); 
  }catch(error){
    res.status(500).json({error:"Server error"});
  }
}

async function handleCreateIncomes(req,res){
  try{
    const userID=req.user.id;
if(!userID) return res.status(400).json({error:"login token error"});
    const {income_amount,income_category,income_description,income_date}=req.body;
    if(!income_amount||!income_category||!income_date) return res.status(400).json({error:"Input all fields"});
    if(Number(income_amount)>=0){
    await INCOME.create({income_amount,income_category,income_description,income_date,author:userID});
  return res.status(200).json({msg:"Successfully created"});
}else{
  return res.status(400).json({error:"Amount must be greater than or equal to 0"});
}
  }catch(error){
    return res.status(500).json({error:error});
  }
}

async function handleUpdateIncome(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({error:"No id"});
    const {income_amount,income_category,income_description,income_date}=req.body;
    if(!income_amount&&!income_category&&income_date) return res.status(400).json({error:"Input all fields"});
    if(Number(income_amount)>=0){
      await INCOME.findByIdAndUpdate(id,{income_amount,income_category,income_description,income_date});
      return res.status(200).json({msg:"Successfully updated"});
    }else{
      return res.status(400).json({error:"Amount must be greater than or equal to 0"});
    }
  }catch(error){
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
    return res.status(500).json({error:"Server error"});
  }
}

async function handleDeleteIncome(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({error:"No id"});
    const deleteIncome =await INCOME.findByIdAndDelete(id);
    if(!deleteIncome) return res.status(404).json({error:"No data found"});
 return res.status(200).json({msg:"Successfully deleted"});
  }catch(error){
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
    return res.status(500).json({error:"Server error"});
  }
}

async function handleGetIncome(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({error:"No id"});
   const getIncome= await INCOME.findById(id).populate("author");
   if(!getIncome) return res.status(200).json({});
 return res.status(200).json(getIncome);
  }catch(error){
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
   return res.status(500).json({error:"Server error"});
  }
}

module.exports={handleGetAllIncomes,handleCreateIncomes,handleUpdateIncome,handleDeleteIncome,handleGetIncome}