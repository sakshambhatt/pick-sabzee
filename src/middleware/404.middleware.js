function notFoundHandler(req, res, next) {
  res.status(404).json({ success: false, message: "This page doesn't exist" });
}
module.exports = { notFoundHandler };
