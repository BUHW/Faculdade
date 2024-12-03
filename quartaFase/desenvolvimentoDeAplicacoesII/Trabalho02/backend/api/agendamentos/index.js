const express = require('express');
const router = express.Router();

const rotaAgendamentos = require('./routes/agendamentos');

router.use('/agendamentos', rotaAgendamentos);

module.exports = router;