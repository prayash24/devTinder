const express = require('express');

const app = express();

app.use("/", (req, res) => {
    res.send("Namaste Dev")
});

app.use("/test", (req, res)=>{

});

app,listen(7777, ()=>{
    console.log("server running");
});