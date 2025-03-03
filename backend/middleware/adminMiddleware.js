const onlyAdminAccess = async (req, res, next) => {
  try {
    if (req.user.profile.role != 1) {
      return res.status(400).json({
        success: false,
        msg: "You don't have the access to this route.",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Something went wrong!",
    });
  }
};

module.exports = {
  onlyAdminAccess,
};
