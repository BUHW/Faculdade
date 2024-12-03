const express = require('express');
const router = express.Router();

const rotaResponsaveis = require('./routes/responsaveis');

router.use('/responsaveis', rotaResponsaveis);

module.exports = router;