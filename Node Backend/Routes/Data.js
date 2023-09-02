const express = require('express');
const data = require('../controller/Data');
const router = express.Router();

router.get('/data', data);

module.exports = router;