const express = require("express");
const router = express.Router();
const { Category } = require("../models/categories.model.js");
const findCategoryById = require("../middleware/findCategoryById.middleware.js");
const { extend } = require("lodash");

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
router.use("/:categoryId", findCategoryById);

router
  .route("/:categoryId")
  // get category by ID
  .get((req, res) => {
    const { category } = req;
    res.status(200).json({ success: true, category });
  })
  // updating category by ID
  .post(async (req, res) => {
    const categoryUpdates = req.body;
    let { category } = req;
    category = extend(category, categoryUpdates);
    try {
      category = await category.save();
      res.status(200).json({ success: true, category });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "error while updating the category",
        errorMessage: err,
      });
    }
  });

module.exports = router;
