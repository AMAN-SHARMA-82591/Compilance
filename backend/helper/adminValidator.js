const { check } = require("express-validator");

exports.permissionAddValidator = [
  check("permission_name", "Permission Name is required")
    .isString()
    .not()
    .isEmpty(),
];

exports.permissionDeleteValidator = [
  check("id", "ID is required").isMongoId().not().isEmpty(),
];

exports.permissionUpdateValidator = [
  check("id", "ID is required").not().isMongoId().isEmpty(),
  check("permission_name", "Permission Name is required")
    .isString()
    .not()
    .isEmpty(),
];

exports.storeRoleValidator = [
  check("role_name", "role_name is required").isString().not().isEmpty(),
  check("value", "value is required").isNumeric().not().isEmpty(),
];
