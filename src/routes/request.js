// const express = require("express");

// const requestRouter = express.Router();
// const { userAuth } = require("../middlewares/auth");

// requestRouter.post(
//   "/request/send/interested/:toUserId",
//   userAuth,
//   async (req, res) => {
//     try {
//       const fromUserId = req.user._id;
//       const toUserId = req.params.toUserId;
//       const status = req.params.status;

//       const allowedStatus = ["ignored, 'interested"];
//       if(!allowedStatus.includes(status)){
//         return res.status(400).json({message: "Invalid Status Type" + status});
//       };

//       const connectionRequest = new ConnectionRequest({
//         fromUserId,
//         toUserId,
//         status,
//       });

//       const data = await connectionRequest.save();
//       res.json({
//         message: "connection request sent sucessfully",
//         data,
//       });
//     } catch (err) {
//       res.status(400).send("ERROR: " + err.message);
//     }
//   },
// );

// module.exports = requestRouter;


const express = require("express");

const requestRouter = express.Router();

const userAuth = require("../middlewares/auth");   // ✅ FIXED
const ConnectionRequest = require("../models/connectionRequest"); // ✅ ADD THIS

const User = require("../models/user")

requestRouter.post(
  "/request/send/:status/:toUserId",   // ✅ added status in route
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];  

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid Status Type: " + status,
        });
      }

      const toUser = await User.findById(toUserId);
      if(!toUser){
        return res.status(404).json({message : " User not found"})
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {fromUserId, toUserId},
          {fromUserId: toUserId, toUserId: fromUserId}
        ]
      })

      if(existingConnectionRequest){
        return res.status(400).send({message: "connection already exists"});
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      

      

      const data = await connectionRequest.save();

      res.json({
        message: "Connection request sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;