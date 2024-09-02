//imports
//packages
const express=require("express");
require("dotenv").config();
const cors=require("cors");
//files
const connectToDb=require("./db/connectToDb");
const dbUrl=process.env.DB_URL;

//routes
const expense= require("./routes/expense");
const income=require("./routes/income");
const user=require("./routes/user");
//imports ends


const app=express();
const PORT=process.env.PORT


//connection to db
connectToDb(dbUrl);

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
//routes
app.get("/",(req,res)=>{
  res.json("HomePage");
})
app.get("/login",)


app.use("/expense",expense);
app.use("/income",income);
app.use("/user",user);



app.listen(PORT,()=>{console.log("SERVER STARTED")});