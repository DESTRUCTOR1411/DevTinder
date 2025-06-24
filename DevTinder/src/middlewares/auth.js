const User = require("../models/user");
const jwt= require("jsonwebtoken")

const userAuth = async (req,res,next)=>{
    //read the token from the req cookie
    try{
        const cookies= req.cookies;
        const {token}= cookies;
        if(!token){
            return res.status(401).send("Please Login!!");
        }
        //validate the token
        const decodedObj= await jwt.verify(token,"DevTinder@");
        //find the user
        const {_id}= decodedObj;
        const user= await User.findById(_id);
        if(!user){
            throw new Error("user does not exist!!!");
        }
        req.user=user;
        next();
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
}

module.exports={
    userAuth,
}