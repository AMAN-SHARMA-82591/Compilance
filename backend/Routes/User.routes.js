const express = require("express");
const multer = require("multer");
const {
  profile,
  users,
  getUser,
  profileList,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  updateProfileImage,
} = require("../controller/User.controller");
const auth = require("../middleware/auth.middleware");
const { checkRoleAccess } = require("../middleware/organization.middleware");
const {
  organizationList,
  createOrganization,
  getOrganization,
  editOrganization,
  deleteOrganization,
} = require("../controller/Organization.controller");
const { profileValidator } = require("../helper/userValidator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Get User Details
router.get("/", auth, users);
router.get("/me", auth, getUser);

// Organization Routes
router
  .route("/organization")
  .get(auth, checkRoleAccess, organizationList)
  .post(auth, checkRoleAccess, createOrganization);
router
  .route("/organization/:id")
  .get(auth, checkRoleAccess, getOrganization)
  .patch(auth, checkRoleAccess, editOrganization)
  .delete(auth, checkRoleAccess, deleteOrganization);

// User Routes
// router.get('/profile/me', auth, organization, profile);
router.get("/profile/me", auth, profile);
// router.get('/profile', auth, profileList);
router
  .route("/profile")
  .get(auth, profileList)
  .post(auth, profileValidator, createProfile);
router.patch(
  "/profile/image/:id",
  auth,
  upload.single("image"),
  updateProfileImage
);
router
  .route("/profile/:id")
  .get(auth, getProfile)
  .patch(auth, updateProfile)
  .delete(auth, checkRoleAccess, deleteProfile);

module.exports = router;
