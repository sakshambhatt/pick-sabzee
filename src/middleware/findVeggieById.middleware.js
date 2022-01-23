const { Veggie } = require("../models/veggies.model.js");

async function findVeggieById (req, res, next) {
  const { veggieId } = req.params;
  try {
    const veggie = await Veggie.findById(veggieId);
    if (!veggie) {
      res.status(200).json({ success: false, message: "veggie not found!" });
    }
    req.veggie = veggie;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error while retrieving veggie",
      errorMessage: err,
    });
  }
}

module.exports = findVeggieById;
