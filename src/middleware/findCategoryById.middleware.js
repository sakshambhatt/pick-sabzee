const { Category } = require("../models/categories.model.js");

async function findCategoryById (req, res, next) {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(200).json({ success: false, message: "category not found!" });
    }
    req.category = category;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error while retrieving product",
      errorMessage: err,
    });
  }
}

module.exports = findCategoryById;
