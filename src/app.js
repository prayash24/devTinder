const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");



app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/", authRouter);

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
