// const mongoose = require("mongoose");

// const connectionRequest = new mongoose.Schema(
//   {
//     fromUserId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },
//     toUserId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: {
//         VALUE: ["ignored", "interested", "accepted", "rejected"],
//         message: `${VALUE} is incorrect`,
//       },
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// const ConnectionRequestModel = new mongoose.model(
//     "ConnectionReequest",
//     connectionRequestSchema
// );
// module.exports = ConnectionRequestModel;

const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"], // ✅ fixed
        message: "{VALUE} is incorrect", // ✅ fixed
      },
    },
  },
  {
    timestamps: true,
  }
);

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest", // ✅ fixed spelling
  connectionRequestSchema // ✅ fixed variable name
);

module.exports = ConnectionRequestModel;