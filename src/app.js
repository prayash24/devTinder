const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.js");
const {validateSignUpData} = require("./utils/validation.js")
const bcrypt = require("bcrypt")

app.use(express.json());

app.post("/signup", async (req, res) => {
  try{
  //validation of data
  validateSignUpData(req);

  //encrypt the password
  const {password} = req.body;
  const passwordHash = bcrypt.hash(password, 10);


  //creating a new instance of the userModel
  const user = new User(req.body);
    await user.save();
    res.send("User added sucessfully!");
  } catch(err) {
    res.status(400).send("Error saving USER" + err.message)
  }
});

//feed API - GET /feed - get all the users from the database
app.get("feed", (req, res) =>{
  
})

connectDB()
  .then(() => {
    console.log("DB Connected");
    app.listen(7777, () => {
      console.log("server running");
    });
  })
  .catch((err) => {
    console.error("DB not Connected");
  });
