const express = require("express");
const router = express.Router();
const { Veggie } = require("../models/veggies.model.js");
const findVeggieById = require("../middleware/findVeggieById.middleware.js");
const validateVeggieCategory = require("../middleware/validateVeggieCategory.middleware.js");
const { extend } = require("lodash");

// middleware to validate category of veggie
router.post("/", validateVeggieCategory);

router
  .route("/")
  .get(async (req, res) => {
    try {
      const veggies = await Veggie.find({});
      res.status(200).json({
        success: true,
        veggies,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "error while retrieving veggies",
        errorStack: err,
      });
    }
  })
  // creation of new veggie
  .post(async (req, res) => {
    const {
      name,
      regionalNames,
      description,
      goodImage,
      goodDescription,
      badImage,
      badDescription,
      category,
    } = req.body;

    const newVeggie = new Veggie({
      name,
      regionalNames,
      description,
      goodImage,
      goodDescription,
      badImage,
      badDescription,
      category,
    });
    try {
      const savedVeggie = await newVeggie.save();
      res.status(200).json({
        success: true,
        savedVeggie,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "error while saving new veggie",
        errorStack: err,
      });
    }
  });

// middleware to get veggie by veggieId
router.use("/:veggieId", findVeggieById);

router
  .route("/:veggieId")
  // get veggie by ID
  .get((req, res) => {
    const { veggie } = req;
    res.status(200).json({ success: true, veggie });
  })
  // updating veggie by ID
  .post(async (req, res) => {
    const veggieUpdates = req.body;
    let { veggie } = req;
    veggie = extend(veggie, veggieUpdates);
    try {
      veggie = await veggie.save();
      res.status(200).json({ success: true, veggie });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "error while updating the veggie",
        errorMessage: err,
      });
    }
  });

module.exports = router;
