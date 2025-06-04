function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      msg: "Validation Error",
      errors: err.errors,
    });
  }

  if (err.code && err.code === 11000) {
    return res.status(409).json({
      success: false,
      msg: "Duplicate field value entered",
      keyValue: err.keyValue,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      msg: `Invalid ${err.path}: ${err.value}`,
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      msg: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    msg: "Server Error",
    error: err.message,
  });
}

module.exports = errorHandler;
