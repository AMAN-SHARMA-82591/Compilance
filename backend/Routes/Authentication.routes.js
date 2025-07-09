const express = require("express");
const {
  login,
  register,
  logout,
  googleLogin,
  githubLogin,
  linkedinLogin,
} = require("../controller/Authentication.controller");
const auth = require("../middleware/auth.middleware");
const organization = require("../middleware/organization.middleware");
const {
  permissionAddValidator,
  permissionDeleteValidator,
  permissionUpdateValidator,
  storeRoleValidator,
} = require("../helper/adminValidator");
const {
  updatePermission,
  getPermission,
  createPermission,
  deletePermission,
} = require("../controller/admin/permission.controller");
const { onlyAdminAccess } = require("../middleware/admin.middleware");
const { createRole, getRoles } = require("../controller/admin/role.controller");
const {
  userLoginValidator,
  userRegisterValidator,
} = require("../helper/userValidator");
const router = express.Router();

// Auth Routes
router.post("/register", userRegisterValidator, register);
router.post("/login", userLoginValidator, login);
router.post("/login/google", googleLogin);
router.post("/login/github", githubLogin);
router.post("/login/linkedin", linkedinLogin);
router.post("/logout", logout);

// Permission Routes
router
  .route("/admin/permission")
  .post(auth, onlyAdminAccess, permissionAddValidator, createPermission)
  .get(auth, onlyAdminAccess, permissionAddValidator, getPermission)
  .patch(auth, onlyAdminAccess, permissionUpdateValidator, updatePermission);

router
  .route("/admin/permission/:id")
  .delete(auth, onlyAdminAccess, permissionDeleteValidator, deletePermission);

// Role Routes
router
  .route("/admin/role")
  .post(auth, onlyAdminAccess, storeRoleValidator, createRole)
  .get(auth, onlyAdminAccess, storeRoleValidator, getRoles);

module.exports = router;
