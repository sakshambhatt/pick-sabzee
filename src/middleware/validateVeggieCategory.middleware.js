const { allowedCategories } = require("../configs/config");

function validateVeggieCategory (req, res, next) {
  const { category } = req.body;
  const allowedCategoriesSet = new Set(allowedCategories);
  if (allowedCategoriesSet.has(category)) {
    next();
  } else {
    res.status(400).json({
      success: false,
      message: `${category} not found in currently allowed categories`,
    });
  }
}

module.exports = validateVeggieCategory;
