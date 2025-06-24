const express=require("express");
const profileRouter= express.Router();
const {userAuth}= require("../middlewares/auth.js")
const {validateEditProfileData}= require("../utils/validation.js")

profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    try{
      const user= req.user;
      res.send(user);
    }
    catch(err){
      res.status(400).send("Error logging "+err.message);
    }
});

profileRouter.patch("/profile/edit",userAuth, async (req,res)=>{
  try{
    if(!validateEditProfileData(req)){
      throw new error("INVALID EDIT REQUEST!!");
    }

    const loggedInUser=req.user;
    // console.log(loggedInUser);
    //traverse for each keys in the request 
    Object.keys(req.body).forEach((keys)=>(loggedInUser[keys]=req.body[keys]));
    // console.log(loggedInUser);
    await loggedInUser.save();

    res.json({
      message:`${loggedInUser.firstName} your profile is updated Successfully!!!`,
      data : loggedInUser,
    });

  }catch(err){
    res.status(400).send("ERROR: "+err.message);
  }
})

module.exports= profileRouter;

