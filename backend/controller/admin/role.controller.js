const { validationResult } = require("express-validator");
const roleModel = require("../../model/Role.model");

const getRoles = async (req, res) => {
  try {
    const rolesData = await roleModel.find({
      value: { $ne: 1 },
    });
    return res.status(200).json({
      success: true,
      message: "Roles Fetched successfully.",
      data: rolesData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const createRole = async (req, res) => {
  const { role_name, value } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        message: "Errors",
        errors: errors.array(),
      });
    }
    const role = new roleModel({
      role_name,
      value,
    });
    const roleData = await role.save();
    return res.status(200).json({
      success: true,
      message: "Role created successfully.",
      data: roleData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRoles,
  createRole,
};
