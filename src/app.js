const express = require('express');

const app = express();

//this will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({firstName: "prayash", lastName: "naik"})
});

app.post("/user", (req, res) => {
    //saving data to db
    res.send("Data saved!");
});

app.delete("/user", (req, res) => {
    res.send("Data Deleted");
});

//this will match all the http method api calls to /
app.use("/", (req, res) => {
    res.send("Namaste Dev")
});

app.use("/test", (req, res)=>{

});

app.listen(7777, ()=>{
    console.log("server running");
});