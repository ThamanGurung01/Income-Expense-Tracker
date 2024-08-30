//imports
//packages
const express=require("express");
require("dotenv").config();



//files
const expense= require("./routes/expense");

//imports ends


const app=express();
const PORT=process.env.PORT

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//routes
app.get("/",(req,res)=>{
  res.json("HomePage");
})

app.use("/expense",expense);



app.listen(PORT,()=>{console.log("SERVER STARTED")});