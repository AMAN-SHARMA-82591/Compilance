const express = require('express');
const multer = require('multer');

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null,  uniqueSuffix + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

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
router.patch('/profile/image/:id', auth, upload.single('image'), updateProfileImage);
router.route('/profile/:id').get(auth, getProfile).patch(auth, updateProfile);

module.exports = router;