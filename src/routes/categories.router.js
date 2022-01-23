const express = require("express");

const router = express.Router();
const { Category } = require("../models/categories.model");
const findCategoryById = require("../middleware/findCategoryById.middleware");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const categories = await Category.find({});
      res.status(200).json({
        success: true,
        categories,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "error while retrieving categories",
        errorStack: err,
      });
    }
  })
  // creation of new categories
  .post(async (req, res) => {
    const { name, description, bannerImage } = req.body;
    const newCategory = new Category({
      name,
      description,
      bannerImage,
    });
    try {
      const savedCategory = await newCategory.save();
      res.status(200).json({
        success: true,
        savedCategory,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "error while saving new category",
        errorStack: err,
      });
    }
  });

// middleware to get category by categoryId
router.route("categoryId", findCategoryById);

router
  .route("/:categoryId")
  // get category by ID
  .get((req, res) => {
    const { category } = req;
    // eslint-disable-next-line no-underscore-dangle
    category._v = undefined;
    res.status(200).json({ success: true, category });
  });
// updating category by ID
module.exports = router;
