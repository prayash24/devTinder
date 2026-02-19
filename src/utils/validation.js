const validator = require("validator");

const validateSignUpData = (req) =>{
    const{firstName, lastName, emailId, password}=req.body;
    if(!firstName || !lastName ){
        throw new Error("name is not valid");
    }
    else if(firstName.length<4 || firstName.length>50){
        throw new Error("First name should be more than 4 character");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("please enter strong password");
    }
};

module.exports = {
    validateSignUpData
};