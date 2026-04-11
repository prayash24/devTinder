const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation.js")
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try{
  //validation of data
  validateSignUpData(req);

  //encrypt the password
  const {firstName, lastName, emailId, password} = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);
  

  //creating a new instance of the userModel  z
  const user = new User({
    firstName, lastName, emailId, password: passwordHash,
  });

    await user.save();
    res.send("User added sucessfully!");
  } catch(err) {
    res.status(400).send("Error saving USER" + err.message)
  }
});

authRouter.post("/login", async(req, res)=>{
    try{
        const {emailId, password}=req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
            const token = await user.getJWT();

            res.cookie("token", token, {
                expires: new Date(Date.now()+8*3600000),
            });
            res.send("Login Sucessfull");
        }else{
          throw new Error("Invalid Credentials");
        }
    } catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/logout", async(req, res)=>{
  req.cookie("token", null,{
    expires: new Date(Date.now()),
  });
  res.send("Logout Sucessful");
})

module.exports=authRouter;