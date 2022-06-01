const express = require('express');
const router = express.Router();

// @route GET api/post
// @descr Test Route
// @acess Public
router.get('/', (req, res) => res.send('Post Route'));

module.exports = router;
