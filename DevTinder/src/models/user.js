const mongoose = require('mongoose');
const validator= require('validator');
const jwt=require("jsonwebtoken");
//creating the schema first
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String,
        // required:true,
    },
    emailId:{
        type: String,
        lowercase:true,
        required:true,
        unique:true,
        trim: true,//trim the blank spaces

        validate(value){
            if(!validator.isEmail(value)){
                throw new error("user Email is not valid")
            }
        }
    },
    password:{
        type: String,
        required:true,
        // minLength: 8,
        // maxlength: 10,
        // validate(value){
        //     if(!validator.isStrongPassword(value)){
        //         throw new error("Password is not strong enough")
        //     }
        // }
    },
    age:{
        type: Number,
    },
    gender:{
        type: String,
    },
    photoUrl:{
        type: String,
        default: "https://www.bing.com/images/search?view=detai0"
    },
    skills:{
        type: [String],
    },
},{
    timestamp:true,
})
//asigning the token
userSchema.methods.getJWT = async function(){
    const user= this;
    const token= await jwt.sign({_id:user._id},"DevTinder@",{expiresIn: "1d"});
    return token;
}


//creating the model then
const User= mongoose.model("User", userSchema); //(name of model, schema of model that is defined above)

module.exports= User;