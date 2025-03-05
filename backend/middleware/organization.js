module.exports = function (req, res, next) {
  const { profile } = req.user;
  try {
    const authAdminRole = [1, 2];
    if (!profile.orgId && !authAdminRole.includes(profile.role)) {
      return res.status(401).json({ msg: "Organization is not been created" });
    }
    req.oid = profile.orgId;
    return next();
  } catch (error) {
    res.status(401).json({ msg: "Something weng wrong!" });
  }
};
