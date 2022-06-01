const mongoose = require("mongoose");
const config = require("config");
//Config will look for the default.js file
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log("Mongo DB connected...");
  } catch (err) {
    console.error(err.message);

    //Exit process with failure
    process.exit(1);
  }
};

//This is a feature of node.js, need to module.exports to use the function outside
module.exports = connectDB;
