const express= require("express");
const {validateSignUpData}=require('../utils/validation.js')
const bcrypt= require("bcrypt");
const User= require('../models/user.js');

const authRouter = express.Router();

authRouter.post('/signup',async(req,res)=>{
    try{
      //first validating the data
      validateSignUpData(req);
      // ..second encrypting the passwords
      const {firstName,lastName,emailId,password}= req.body;
      const passwordHash= await bcrypt.hash(password,10);//10  here is salt!!!!!
  
  
      // creating new instance to the User model
        const user= new User({
          firstName,lastName,emailId,password: passwordHash,
        })
  
        await user.save();
        res.send("User Added succesfuly!!!");
      }catch(err){
        res.status(400).send("Error saving the data"+err.message);
      }
  
});

authRouter.post('/login', async (req,res)=>{
    try{
      const { emailId, password}= req.body;
  
      const user= await User.findOne({emailId:emailId});
      //is user exist
      if(!user){
        throw new error("invalid credentials");
      }
      //if yes ? check pssword
      const isPasswordValid= await bcrypt.compare(password,user.password);
      
      if(isPasswordValid){ 
        //creaing a jwt token
        const token= await user.getJWT();
        //adding the token to the response and send it to user;
        res.cookie("token",token);
        
        res.send(user);
      }else{
        throw new error("invalid credentials");
      }
      
    }catch(err){
      res.status(400).send("Error logging "+err.message);
    }
});

authRouter.post('/logout', async (req,res)=>{
    res.cookie("token",null, {
        expires: new Date(Date.now()),
    });
    res.send("Logged out succesfully");
})

module.exports= authRouter;