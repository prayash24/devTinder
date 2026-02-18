const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Prayash24:Prayashnaik24@devtinder.7fb3bdr.mongodb.net/devtinderDB")
}

module.exports = connectDB;


