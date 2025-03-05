const { check } = require("express-validator");

exports.taskValidator = [
  check("status", "Status Field is required").not().isEmpty(),
  check("title", "Title Field is required").not().isEmpty(),
  // check("userId", "User ID is required").not().isEmpty(),
  check("orgId", "Organization ID is required").not().isEmpty(),
  check("type", "Type Field is required").not().isEmpty(),
  check("priority", "Priority Field is required").not().isEmpty(),
];
