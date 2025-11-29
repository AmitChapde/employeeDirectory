const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const url = `mongodb+srv://jack:w8tItiTf0FsFCFTp@cluster0.jywt36i.mongodb.net/?appName=Cluster0`;
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
