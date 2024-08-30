const mongoose=require("mongoose");

function connectToDb(url){

  return mongoose.connect(url).then(()=>{
    console.log("Successfully Connected To Database")
  }).catch((error)=>{
    console.log(error);
  });
}

module.exports=connectToDb;