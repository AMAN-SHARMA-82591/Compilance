const { check } = require("express-validator");

exports.userLoginValidator = [
  check("email", "Email Field is required").isEmail().not().isEmpty(),
  check("password", "Password Field is required").isString().not().isEmpty(),
];

exports.userRegisterValidator = [
  check("name", "Name Field is required").isString().not().isEmpty(),
  check("email", "Email Field is required").isEmail().not().isEmpty(),
  check("password", "Password Field is required").isString().not().isEmpty(),
];

exports.profileValidator = [
  check("name", "Name Field is required").isString().not().isEmpty(),
  check("email", "Email Field is required").isEmail().not().isEmpty(),
  check("orgId", "Organization Field is required").isString().not().isEmpty(),
];
