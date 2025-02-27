const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const { profile } = req.user; // Check if you need to verify token or not. Because you're already verifying your token in auth middleware
  try {
    if (!profile.oid) {
      return res.status(401).json({ msg: "Organization is not been created" });
    }
    req.oid = decoded.profile.oid;
    return next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
