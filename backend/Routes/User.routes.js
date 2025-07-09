const express = require("express");
const {
  users,
  getUser,
  profileList,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  getUserProfile,
  updateProfileImage,
} = require("../controller/User.controller");
const auth = require("../middleware/auth.middleware");
const {
  checkRoleAccess,
  checkOrganization,
} = require("../middleware/organization.middleware");
const {
  organizationList,
  createOrganization,
  getOrganization,
  editOrganization,
  deleteOrganization,
} = require("../controller/Organization.controller");
const { profileValidator } = require("../helper/userValidator");
const upload = require("../middleware/multer.middleware");

const router = express.Router();

// Get User Details
router.get("/", auth, users);
router.get("/me", auth, getUser);

// Organization Routes
router
  .route("/organization")
  .get(auth, organizationList)
  .post(auth, checkRoleAccess, createOrganization);
router
  .route("/organization/:id")
  .get(auth, checkRoleAccess, getOrganization)
  .patch(auth, checkRoleAccess, editOrganization)
  .delete(auth, checkRoleAccess, deleteOrganization);

// User Routes
// router.get('/profile/me', auth, organization, profile);
router.get("/profile/me", auth, getUserProfile);
// router.get('/profile', auth, profileList);
router
  .route("/profile")
  .get(auth, checkOrganization, profileList)
  .post(auth, checkRoleAccess, profileValidator, checkOrganization, createProfile);
router.post("/profile/image/:id", auth, upload, updateProfileImage);
router
  .route("/profile/:id")
  .get(auth, checkOrganization, getProfile)
  .patch(auth, profileValidator, checkOrganization, updateProfile)
  .delete(auth, checkOrganization, checkRoleAccess, deleteProfile);

module.exports = router;
