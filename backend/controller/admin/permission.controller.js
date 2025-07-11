const { validationResult } = require("express-validator");
const PermissionModel = require("../../model/Permission.model");

const createPermission = async (req, res) => {
  const { permission_name } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        message: "Errors",
        errors: errors.array(),
      });
    }
    const isExists = await PermissionModel.findOne({ permission_name });
    if (isExists) {
      return res.status(400).json({
        success: false,
        message: "Permission Name already exists.",
      });
    }

    var obj = {
      permission_name,
    };
    if (req.body.default) {
      obj.is_default = parseInt(req.body.default);
    }
    const permission = new PermissionModel(obj);
    const newPermission = await permission.save();
    return res.status(200).json({
      success: true,
      message: "Permission added Successfully",
      data: newPermission,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePermission = async (req, res) => {
  const { id, permission_name } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        message: "Errors",
        errors: errors.array(),
      });
    }
    const isExists = await PermissionModel.findOne({ _id: id });
    if (!isExists) {
      return res.status(400).json({
        success: false,
        message: "Permission ID Not Found.",
      });
    }
    const isNameAssigned = await PermissionModel.findOne({
      _id: { $ne: id },
      permission_name,
    });
    if (isNameAssigned) {
      return res.status(400).json({
        success: false,
        message: "Permission name already assigned to another permission.",
      });
    }

    var obj = {
      permission_name,
    };
    if (req.body.default != null) {
      obj.is_default = parseInt(req.body.default);
    }
    const updatedPermission = await PermissionModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: obj,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Permission added Updated",
      data: updatedPermission,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getPermission = async (req, res) => {
  try {
    const permissions = await PermissionModel.find({});
    return res.status(200).json({
      success: true,
      message: "Permissions Fetched Successfully",
      data: permissions,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePermission = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        message: "Errors",
        errors: errors.array(),
      });
    }
    const { id } = req.params;
    await PermissionModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Permission Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPermission,
  updatePermission,
  deletePermission,
  createPermission,
};
