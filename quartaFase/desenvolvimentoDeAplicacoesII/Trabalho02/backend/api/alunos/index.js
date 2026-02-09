const express = require('express');
const router = express.Router();

const rotaAlunos = require('./routes/alunos');

router.use('/alunos', rotaAlunos);

module.exports = router;