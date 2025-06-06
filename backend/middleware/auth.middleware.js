const jwt = require("jsonwebtoken");
// const UserOrganizationMappingModel = require("../model/UserOrganizationMapping.model");
require("dotenv").config();

module.exports = async function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.uid = decoded.profile.userId;
    return next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
