const express = require('express');
const router = express.Router();
const requests = require('./router/index');

router.use('/requests', requests);

module.exports = router;