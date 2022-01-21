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
    throw new Error("db connection failed: ", err);
  }
}
module.exports = initializeDbConnection;
