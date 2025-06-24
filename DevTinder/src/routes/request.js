const express= require("express");
const requestRouter= express.Router();
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest= require("../models/connectionRequest")
const User= require("../models/user")

requestRouter.post('/request/send/:status/:toUserId',userAuth, async (req,res)=>{

    try{
        const fromUserId=req.user._id;
        const toUserId= req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"invalid status type",
            })
        }

        //checking wheather the user exist or not
        const user= await User.findById(toUserId);
        if(!user){
            // throw new error("User not exists")
            return res.status(400).json({
                message:"user not found",
            })
        }


        //checking wheather the request is already exist or not
        const existingConnectionRequest= await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId: toUserId, toUserId: fromUserId},
            ]
        })
        if(existingConnectionRequest){
            return res.status(400).send({
                message:"Connection Request Already exists"
            })
        }

        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })
        
        // const touser= await User.findById(toUserId);
        const data= await connectionRequest.save();
        res.json({
            message: req.user.firstName + " is " + status + " in " + user.firstName,
            data,
        })

    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }


})

requestRouter.post('/request/review/:status/:requestId',userAuth, async (req,res)=>{
    try{
        const loggedInUser= req.user;
        const {status, requestId}= req.params;
        
        //validate the status
        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Status is not allowed!!"})
        }

        //finding the connection request in my database
        //loggedinuser must be same as to_user id to response it
        const connectionRequest= await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser,
            status: "interested",
        });
        //if connection not found of such type
        if(!connectionRequest){
            return res
            .status(400)
            .json({message:"Connection request not found!!"})
        }
    
        connectionRequest.status=status;
        const data= await connectionRequest.save();

        res.json({
            message: "Connection request "+ status,data
        })

    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
})

module.exports= requestRouter;