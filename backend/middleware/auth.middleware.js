const jwt = require("jsonwebtoken");
// const UserOrganizationMappingModel = require("../model/UserOrganizationMapping.model");
require("dotenv").config();

module.exports = async function (req, res, next) {
  const { token } = req.signedCookies;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No Token, authorization denied" });
  }
  try {
    const { expiry, ...entities } = JSON.parse(
      Buffer.from(token, "base64url").toString()
    );
    const currentTime = Math.round(Date.now() / 1000);
    if (currentTime > expiry) {
      res.clearCookie("token");
      return res.status(401).json({
        success: false,
        msg: "Your session has expired. Please log in again.",
      });
    }
    req.user = entities;
    req.uid = entities.id;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Token expired at:", error.expiredAt);
      return res.status(401).json({
        success: false,
        msg: "Token has expired. Please log in again.",
        expiredAt: error.expiredAt, // Optional: Include the expiration time
      });
    }
    res.clearCookie("token");
    console.error("Something went wrong", error);
    return res.status(401).json({ success: false, msg: "Token is not valid!" });
  }
};
