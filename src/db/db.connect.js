const mongoose = require("mongoose");
const { dbUri } = require("../configs/config");

async function initializeDbConnection() {
  try {
    await mongoose.connect(dbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    throw new Error("db connection failed: ", err);
  }
}
module.exports = initializeDbConnection;
