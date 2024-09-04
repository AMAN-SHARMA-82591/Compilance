const express = require('express');
// const multer = require('multer');

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

const { profile, users, profileList, getProfile, createProfile, updateProfile, updateProfileImage } = require('../controller/User');
const auth = require('../middleware/auth');
const organization = require('../middleware/organization');
const { organizationList, createOrganization, getOrganization, editOrganization, deleteOrganization } = require('../controller/Organization');

const router = express.Router();

router.get('/', auth, users);
router.route('/organization').get(auth, organizationList).post(auth, createOrganization);
router.route('/organization/:id').get(auth, getOrganization).patch(auth, editOrganization).delete(auth, deleteOrganization);
// router.get('/profile/me', auth, organization, profile);
router.get('/profile/me', auth, profile);
// router.get('/profile', auth, profileList);
router.route('/profile').get(auth, profileList).post(auth, createProfile);
router.patch('/profile/image/:id', auth, updateProfileImage);
router.route('/profile/:id').get(auth, getProfile).patch(auth, updateProfile);

module.exports = router;