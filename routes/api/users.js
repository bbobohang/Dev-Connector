const express = require('express');
const router = express.Router();

// @route GET api/users
// @descr Test Route
// @acess Public
router.get('/', (req, res) => res.send('User Route'));

module.exports = router;
