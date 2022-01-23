require("dotenv").config();

const dbUri = process.env.DB_URI;
const port = process.env.PORT;

module.exports = {
  dbUri,
  port,
};
