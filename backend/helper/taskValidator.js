const { check, body } = require("express-validator");

exports.taskValidator = [
  check("status", "Status Field is required").not().isEmpty(),
  check("title", "Title Field is required").not().isEmpty(),
  // body("orgId").custom((value, { req }) => {
  //   if (
  //     (req.user.profile.role === 1 || req.user.profile.role === 2) &&
  //     !value
  //   ) {
  //     throw new Error("Organization ID is required for admin/sub-admin");
  //   }
  //   return true;
  // }),
  check("type", "Type Field is required").not().isEmpty(),
  check("priority", "Priority Field is required").not().isEmpty(),
];
