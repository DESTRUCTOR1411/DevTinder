const express= require("express");
const connectDB=require('./config/database.js')
const cookieParser = require("cookie-parser")
const cors = require('cors')
const app=express();

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true ,
})); 

app.use(express.json());
app.use(cookieParser());

const authRouter= require("./routes/auth.js");
const profileRouter= require("./routes/profile.js");
const requestRouter= require("./routes/request.js");
const userRouter= require("./routes/user");

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

connectDB()
  .then(()=>{
    //first connecting to the database----------
    console.log("Database is connected successfully!!!");

    //then listening to the server--------
    const port=8000;
    app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
    })
  })
  .catch((err)=>{
    console.error("Databse cannot be connected",err);
  })


