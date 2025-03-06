const express = require("express");
const { login, register } = require("../controller/Authentication");
const auth = require("../middleware/auth");
const organization = require("../middleware/organization");
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
} = require("../controller/admin/permissionController");
const { onlyAdminAccess } = require("../middleware/adminMiddleware");
const { createRole, getRoles } = require("../controller/admin/roleController");
const {
  userLoginValidator,
  userRegisterValidator,
} = require("../helper/userValidator");
const router = express.Router();

// Auth Routes
router.post("/register", userRegisterValidator, register);
router.post("/login", userLoginValidator, login);

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
