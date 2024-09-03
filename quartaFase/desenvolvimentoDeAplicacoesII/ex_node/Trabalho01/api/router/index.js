const express = require('express');
const router = express.Router();
const users_route = require('./users')

router.use('/users', users_route);

module.exports = router;