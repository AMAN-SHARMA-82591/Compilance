const { check } = require("express-validator");

exports.userLoginValidator = [
  check("email", "Email Field is required").not().isEmpty(),
  check("password", "Password Field is required").not().isEmpty(),
];

exports.userRegisterValidator = [
  check("name", "Name Field is required").not().isEmpty(),
  check("email", "Email Field is required").not().isEmpty(),
  check("password", "Password Field is required").not().isEmpty(),
];

exports.profileValidator = [
  check("name", "Name Field is required").not().isEmpty(),
  check("email", "Email Field is required").not().isEmpty(),
  check("orgId", "Organization Field is required").not().isEmpty(),
];
