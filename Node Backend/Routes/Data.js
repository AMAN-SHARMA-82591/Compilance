const express = require('express');
const { profile, users } = require('../controller/Data');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, users);
router.get('/profile/me', auth, profile);

module.exports = router;