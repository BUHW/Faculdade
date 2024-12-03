const express = require('express');
const router = express.Router();

const rotaEspecialidades = require('./routes/especialidades');

router.use('/especialidades', rotaEspecialidades);

module.exports = router;