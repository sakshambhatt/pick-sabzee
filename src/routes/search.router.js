const express = require("express");
const router = express.Router();
const { Veggie } = require("../models/veggies.model.js");
const { startCase, toLower } = require("lodash");

router.route("/").get(async (req, res) => {
  let { q } = req.query;
  q = startCase(toLower(`${q}`));
  try {
    const searchResult = await Veggie.findOne({
      name: `${q}`,
    });
    if (searchResult === null) {
      const regionalSearchResult = await Veggie.findOne({
        regionalNames: { $in: [`${q}`] },
      });

      if (regionalSearchResult === null) {
        res.status(200).json({
          success: false,
          veggieId: "",
          message: `no veggie named ${q} found`,
        });
      } else {
        res.status(200).json({
          success: true,
          veggieId: regionalSearchResult._id,
          message: "veggie found!",
        });
      }
    } else {
      res.status(200).json({
        success: true,
        veggieId: searchResult._id,
        message: "veggie found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error while searching veggie",
      errorMessage: err,
    });
  }
});

module.exports = router;
