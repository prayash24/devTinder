// // src/middlewares/auth.js

// try{
//     const {token} = req.cookies;
//     if(!token){
//         throw new Error("Token is not valid!");
//     }
//     const decodedObj = await isJWT.verify(token, "PRAYASH@24");

//     const {_id}= decodedObj;
//     const user=await User.findById(_id);
//     if(!user){
//         throw new Error("User not found");
//     }
//     req.user=user;
//     next();
// }catch(err){
//     res.status(400).send("Error: "+ err.message);
// };

// module.exports = auth;

// src/middlewares/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Token is not valid!");
        }

        const decodedObj = jwt.verify(token, "PRAYASH@24");

        const { _id } = decodedObj;

        const user = await User.findById(_id);

        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;

        next();
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
};

module.exports = auth;