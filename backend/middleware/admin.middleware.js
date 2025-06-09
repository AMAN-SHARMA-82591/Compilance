const onlyAdminAccess = async (req, res, next) => {
  try {
    if (req.user.role != 1) {
      return res.status(400).json({
        success: false,
        message: "You don't have the access to this route.",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  onlyAdminAccess,
};
