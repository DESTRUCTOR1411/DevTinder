const validator= require('validator');

const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}= req.body;
    if(!firstName || !lastName){
        throw new error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new error("emailId is not valid");
    }
    // else if(!validator.isStrongPassword(password)){
    //     throw new error("Password is not strong Enough");
    // }
}

const validateEditProfileData=(req)=>{
    const allowedEditFeilds=["firstName","lastName","emailId","age","gender","skills"];

    const isEditAllowed= Object.keys(req.body).every((feild)=>
        allowedEditFeilds.includes(feild)
    );
    
    return isEditAllowed;//will return boolean value whether it is allowed or not;
}

module.exports={
    validateSignUpData,
    validateEditProfileData,
}