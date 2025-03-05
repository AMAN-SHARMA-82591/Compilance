const { check } = require('express-validator');



exports.profileValidator = [
    check("name", "Name Field is required").not().isEmpty(),
    check("email", "Email Field is required").not().isEmpty(),
    check("orgId", "Organization Field is required").not().isEmpty(),
  ];