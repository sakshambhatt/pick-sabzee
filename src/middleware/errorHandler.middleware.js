function errorHandler(err, req, res, next) {

  res.status(500).json({ success: false, message: "server ran into an error", stack: err.stack });
}
module.exports = { errorHandler };