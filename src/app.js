const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating a new instance of the userModel
  const user = new User(req.body);
  try{
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
