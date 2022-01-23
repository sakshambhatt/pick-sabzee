const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const initializeDbConnection = require("./db/db.connect");
const categories = require("./routes/categories.router");
const { errorHandler } = require("./middleware/errorHandler.middleware");
const { notFoundHandler } = require("./middleware/404.middleware");
const { port } = require("./configs/config");

const app = express();
app.use(cors());
app.use(bodyParser.json());

(async function () {
  try {
    await initializeDbConnection();
  } catch (err) {
    console.error(err);
  }
})();

app.use("/categories", categories);

/* endpoints TODO:
 *  create/ read/ update sabzee
 *  search endpoint where you give sabzee name and get sabzee
 */

app.get("/", (req, res) => {
  res.send("Hello Sabzee app!");
});

app.use(errorHandler);

/*
 * 404 route handler. This should be always the last thing before app.listen
 */
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
