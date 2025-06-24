const express= require("express");
const userRouter=express.Router();
const {userAuth}= require("../middlewares/auth") 
const connectionRequest=require("../models/connectionRequest");
const User = require("../models/user");

const safe_Data="firstName lastName gender age skills";

//get all the pending requests for the loggedIn user
userRouter.get('/user/requests/recieved', userAuth, async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests= await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId",safe_Data); 
 
        res.json({
            message:"Data fetched succesfully!!!",
            data: connectionRequests,
        })

    }catch(err){
        res.statusCode(400).send("ERROR: "+err.message);
    }
})

///all the connections that a user have after sending and receiving both
userRouter.get('/user/connections',userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests= await connectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id,status:"accepted"},
                {tofromUserId:loggedInUser._id,status:"accepted"},
            ]
        }).populate("fromUserId",safe_Data)
        .populate("toUserId",safe_Data);
        
        
        
        const data= connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId; 
        });

        res.json({data});

    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})

//feed api
userRouter.get('/feed',userAuth,async(req,res)=>{
    try{
        const loggedInUser= req.user;
        
        //paging
        const page= parseInt(req.query.page) || 1;
        let limit= parseInt(req.query.limit) || 10;
        limit= (limit>50)? 50: limit;
        const skip= (page-1)*limit;

        ///find all the connection requests (sent + recieved)
        const connectionRequests= await connectionRequest.find({
            $or: [{fromUserId: loggedInUser._id},{toUserId: loggedInUser._id}]
        }).select("fromUserId toUserId");
        
        //hinding all the users who is already conected i.e. logic of above code
        const hideUsersFromFeed= new Set();
        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId);
            hideUsersFromFeed.add(req.toUserId);
        })

        //users that are left to be on feed
        const users= await User.find({
            $and: [
                {_id: { $nin: Array.from(hideUsersFromFeed)}},
                {_id: {$ne: loggedInUser._id}},
            ],
        }).select(safe_Data).skip(skip).limit(limit);


        res.send(users);  

    }catch(err){
        res.status(400).json({message: err.message});
    }
})

module.exports= userRouter;