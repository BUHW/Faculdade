const express = require('express');
const router = express.Router();

const rotaUsuarios = require('./routes/usuarios');

router.use('/usuarios', rotaUsuarios);

module.exports = router;