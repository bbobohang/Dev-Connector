const express = require('express');
const router = express.Router();

// @route GET api/Auth
// @descr Test Route
// @acess Public
router.get('/', (req, res) => res.send('Auth Route'));

module.exports = router;
