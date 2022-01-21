const mongoose = require("mongoose");
const { dbUri } = require("../configs/config.js");

async function initializeDbConnection() {
  try {
    await mongoose.connect(dbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected to db!");
  } catch (err) {
    console.error("db connection failed");
    res
      .status(500)
      .json({
        success: false,
        message: "db connection failed",
        errorMessage: err,
      });
  }
}
module.exports = initializeDbConnection;
