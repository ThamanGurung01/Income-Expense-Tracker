//imports
//packages
const express=require("express");
require("dotenv").config();



//files
const connectToDb=require("./db/connectToDb");
const dbUrl=process.env.DB_URL;

const expense= require("./routes/expense");

//imports ends


const app=express();
const PORT=process.env.PORT


//connection to db
connectToDb(dbUrl);

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//routes
app.get("/",(req,res)=>{
  res.json("HomePage");
})

app.use("/expense",expense);



app.listen(PORT,()=>{console.log("SERVER STARTED")});