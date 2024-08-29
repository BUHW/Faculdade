const express = require('express');
const router = express.Router();
const users = require('./router/users');

router.use('/users', users);

module.exports = router;