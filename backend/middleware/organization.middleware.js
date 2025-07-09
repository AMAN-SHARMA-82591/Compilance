const UserOrgMap = require("../model/UserOrganizationMapping.model");
const { authAdminRole } = require("../utils/constants");

const checkOrganization = async function (req, res, next) {
  const { role } = req.user;
  const orgId = req.headers.orgid || null;
  try {
    // if (Boolean(orgId) === false && authAdminRole.includes(role)) {
    if (!Boolean(orgId)) {
      return res.status(401).json({
        message:
          "Organization is not been created. Please create an organization first.",
      });
    }

    const mapping = await UserOrgMap.findOne({ userId: req.uid, orgId })
      .lean()
      .select("orgId -_id");
    if (!mapping.orgId) {
      return res
        .status(403)
        .json({ message: "You are not a member of this organization." });
    }
    req.oid = orgId;
    return next();
  } catch (error) {
    next(error);
  }
};

const checkRoleAccess = function (req, res, next) {
  const { role } = req.user;
  try {
    if (role === 0) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkOrganization,
  checkRoleAccess,
};
