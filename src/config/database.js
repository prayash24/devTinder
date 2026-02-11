const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Prayash24:Prayashnaik24@cluster0.ipgcgws.mongodb.net/?appName=Cluster0/devTinder")
}

module.exports = connectDB;

