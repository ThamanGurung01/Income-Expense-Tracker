//imports
//packages
const express=require("express");
require("dotenv").config();
const cors=require("cors");
const cookieParser=require("cookie-parser");
//files
const connectToDb=require("./db/connectToDb");
const dbUrl=process.env.DB_URL;
const verifyUser=require("./middlewares/authentication")
//routes
const expense= require("./routes/expense");
const income=require("./routes/income");
const user=require("./routes/user");
const login=require("./routes/login");
const { handleCreateUser } = require("./controller/createUser");
const { handleGetUserAuth } = require("./controller/user");
//imports ends


const app=express();
const PORT=process.env.PORT;
const frontendUrl=process.env.frontendUrl;

//connection to db
connectToDb(dbUrl);

//middlewares
app.use(cookieParser());

app.use(cors({
  origin: frontendUrl,
  credentials:true,
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());
//routes
app.get("/",(req,res)=>{
  res.json("HomePage");
})
app.use("/login",login);
app.use("/expense",verifyUser,expense);
app.use("/income",verifyUser,income);
app.use("/user",verifyUser,user);
app.post("/userCreate",handleCreateUser)
app.get("/userAuth",verifyUser,handleGetUserAuth);

app.listen(PORT,()=>{console.log("SERVER STARTED")});