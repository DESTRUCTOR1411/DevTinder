const mongoose= require("mongoose");
const User= require("./user") 
const connectionRequest= new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",//reference to the user collection
        required:true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type: String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            enum:`{VALUE} is incorrect status type`
        }
    }
},
{
    timestamps: true,
}
);

connectionRequest.pre("save",function(next){
    const connectionRequest=this;
    //check if the fromUser is not equal to the toUser
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new error("Cannot send connectino to yourself")
    }
    next();
})

const ConnectionRequestModel= new mongoose.model("ConnectionRequest",connectionRequest);

module.exports = ConnectionRequestModel;