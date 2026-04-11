// const express = require('express');
// const profileRouter = express.Router();

// const{userAuth}= require("../middlewares/auth")
// const{validateEditProfileData} = require("../utils/validation")

// profileRouter.get("/profile/view", userAuth, async(req, res)=>{
//     try{
//         const user=req.user;
//         res.send(user);
//     }catch(err){
//         res.status(400).send("ERROR:" + err.message);
//     }
// });


// profileRouter.patch("/profile/edit", userAuth, async(req, res)=>{
//     try{
//         if(!validateEditProfileData(req)){
//             throw new Error("Invalid Edit Request");
//             //return res.status(400).send("");
//         }

//         const loggedInuser = req.user;
//         Object.keys(req.body).forEach((key) => (loggedInuser[key]= req.body[key]));
//         await loggedInuser.save();

//         res.json({
//             message: `${loggedInuser.firstName}, your profile updated sucessfully`,
//             data: loggedInuser,
//         });
//     }
//     catch(err){
//         res.status(400).send("ERROR:" +err.message);
//     }
// });

// module.exports = profileRouter;

const express = require('express');
const profileRouter = express.Router();

const userAuth = require("../middlewares/auth");   // ✅ FIXED
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInuser = req.user;

        Object.keys(req.body).forEach((key) => {
            loggedInuser[key] = req.body[key];
        });

        await loggedInuser.save();

        res.json({
            message: `${loggedInuser.firstName}, your profile updated successfully`,
            data: loggedInuser,
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;