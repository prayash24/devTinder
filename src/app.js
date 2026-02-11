const express = require('express');
const connectDB = require('./config/database')

const app = express();

// //this will only handle GET call to /user
// app.get("/user", (req, res) => {
//     res.send({firstName: "prayash", lastName: "naik"})
// });

// //if ? is between b&c like /ab?c then b is optional that means /abc works, /ac also works
// //if + is between b&c like ab+c then any number of b is acceptable like abc, abbc, abbbc, abbbbc, but aabc not acceptable, abccc not acceptable
// //if * is between any two things like ab*cd anything between ab & cd is acceptable like aboipicd, abicd
// app.get("/ab?c", (req, res) => {
//     res.send({firstName: "prayash", lastName: "naik"})
// });

// app.post("/user", (req, res) => {
//     //saving data to db
//     res.send("Data saved!");
// });

// app.delete("/user", (req, res) => {
//     res.send("Data Deleted");
// });

// //this will match all the http method api calls to /
// app.use("/", (req, res) => {
//     res.send("Namaste Dev")
// });

// app.use("/test", (req, res)=>{

// });

//multiple route handlers

// app.use("/user", (req, res, next)=>{
//     res.send("1st")
//     next();
// },
// (req, res, next) => {
//     res.send("2nd")
//     next();
// },
// (req, res, next) => {
//     res.send("3rd")
// }
// );
connectDB().then(()=>{
    console.log("DB Connected");
    app.listen(7777, ()=>{
    console.log("server running");
});
}).catch(err => {
    console.error("DB not Connected");
})
