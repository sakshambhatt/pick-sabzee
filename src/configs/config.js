require("dotenv").config();

const dbUri = process.env.DB_URI;
const port = process.env.PORT;

const allowedCategories = ["Green leafy", "Flower", "Fruit", "Stem", "Root"];

module.exports = {
  dbUri,
  port,
  allowedCategories,
};
