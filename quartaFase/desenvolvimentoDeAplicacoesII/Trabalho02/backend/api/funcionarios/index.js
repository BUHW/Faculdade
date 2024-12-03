const express = require('express');
const router = express.Router();

const rotaFuncionarios = require('./routes/funcionarios');

router.use('/funcionarios', rotaFuncionarios);

module.exports = router;