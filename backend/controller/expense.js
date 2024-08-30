
async function handleGetAllExpenses(req,res){
res.json({msg:"successfuly get all Expenses"});
}

async function handleCreateExpenses(req,res){

res.json({msg:"successfully created"});
}

async function handleUpdateExpense(req,res){

res.json({msg:"successfully updated"});
}

async function handleDeleteExpense(req,res){

res.json({msg:"successfully deleted"});
}

async function handleGetExpense(req,res){

res.json({msg:"successfully got expenses"});
}

module.exports={handleGetAllExpenses,handleCreateExpenses,handleUpdateExpense,handleDeleteExpense,handleGetExpense}