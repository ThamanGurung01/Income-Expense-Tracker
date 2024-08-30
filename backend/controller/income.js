const mongoose=require("mongoose");
const INCOME=require("../model/income");

async function handleGetAllIncomes(req,res){
  try{
    const allIncomes=await INCOME.find({});
    if(allIncomes.length===0) return res.status(404).json({msg:"no data"});
  return res.json(allIncomes); 
  }catch(error){
    res.status(500).json({error:"server error"});
  }
}

async function handleCreateIncomes(req,res){
  try{
    const {income_amount,income_category,income_description,income_date}=req.body;
    // console.log(req.body);
    if(!income_amount||!income_category||!income_date) return res.status(400).json({msg:"Input all fields"});
    if(Number(income_amount)>=0){
    await INCOME.create({income_amount,income_category,income_description,income_date});
  return res.status(200).json({msg:"successfully created"});
}else{
  return res.status(400).json({msg:"must be greater than or equal to 0"});
}
  }catch(error){
    return res.status(500).json({error:error});
  }
}

async function handleUpdateIncome(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({msg:"error: no id"});
    const {income_amount,income_category,income_description,income_date}=req.body;
    if(!income_amount&&!income_category&&income_date) return res.status(400).json({msg:"error: Input all fields"});
    if(Number(income_amount)>=0){
      await INCOME.findByIdAndUpdate(id,{income_amount,income_category,income_description,income_date});
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

async function handleDeleteIncome(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({msg:"error: no id"});
    const deleteIncome =await INCOME.findByIdAndDelete(id);
    if(!deleteIncome) return res.status(404).json({msg:"no data found"});
 return res.status(200).json({msg:"successfully deleted"});
  }catch(error){
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
    return res.status(500).json({error:"server error"});
  }
}

async function handleGetIncome(req,res){
  try{
    const id=req.params.id;
    if(!id) res.status(400).json({msg:"error: no id"});
   const getIncome= await INCOME.findById(id);
   if(!getIncome) return res.status(404).json({msg:"no data found"});
 return res.status(200).json(getIncome);
  }catch(error){
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
   return res.status(500).json({error:"server error"});
  }
}

module.exports={handleGetAllIncomes,handleCreateIncomes,handleUpdateIncome,handleDeleteIncome,handleGetIncome}