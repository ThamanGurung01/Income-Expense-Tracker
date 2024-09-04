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
//imports ends


const app=express();
const PORT=process.env.PORT;
const frontendUrl=process.env.frontendUrl;

//connection to db
connectToDb(dbUrl);

//middlewares
app.use(cookieParser());

// app.use(cors({
//   origin: frontendUrl,
//   credentials:true,
// }));
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
      if (frontendUrl.includes(origin) || !origin) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  }
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());
//routes
app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  next();
});
app.get("/",(req,res)=>{
  res.json("HomePage");
})
app.use("/login",login);
app.use("/expense",verifyUser,expense);
app.use("/income",verifyUser,income);
app.use("/user",user);



app.listen(PORT,()=>{console.log("SERVER STARTED")});