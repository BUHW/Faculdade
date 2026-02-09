const express = require('express');
const router = express.Router();

const rotaAgendamentos = require('./routes/setores');

router.use('/setores', rotaSetores);

module.exports = router;