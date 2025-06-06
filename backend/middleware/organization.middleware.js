const { authAdminRole } = require("../utils/constants");

const checkOrganization = function (req, res, next) {
  const { profile } = req.user;
  try {
    if (!profile.orgId && !authAdminRole.includes(profile.role)) {
      return res.status(401).json({ msg: "Organization is not been created" });
    }
    req.oid = profile.orgId;
    return next();
  } catch (error) {
    res.status(401).json({ msg: "Something weng wrong!" });
  }
};

const checkRoleAccess = function (req, res, next) {
  const { profile } = req.user;
  try {
    if (profile.role === 0) {
      return res
        .status(403)
        .json({ msg: "Access denied. Insufficient permissions." });
    }
    return next();
  } catch (error) {
    res.status(401).json({ msg: "Something went wrong!" });
  }
};

module.exports = {
  checkOrganization,
  checkRoleAccess,
};
