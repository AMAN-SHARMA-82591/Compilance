const { check } = require("express-validator");

exports.permissionAddValidator = [
  check("permission_name", "Permission Name is required").not().isEmpty(),
];

exports.permissionDeleteValidator = [
  check("id", "ID is required").not().isEmpty(),
];

exports.permissionUpdateValidator = [
  check("id", "ID is required").not().isEmpty(),
  check("permission_name", "Permission Name is required").not().isEmpty(),
];

exports.storeRoleValidator = [
  check("role_name", "role_name is required").not().isEmpty(),
  check("value", "value is required").not().isEmpty(),
];
