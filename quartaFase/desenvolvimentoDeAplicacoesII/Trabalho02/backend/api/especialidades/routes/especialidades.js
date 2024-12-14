const express = require('express');
const router = express.Router();
const especialidade = require('../controllers/especialidadesController');

router.post('/', especialidade.especialidadesController.criarEspecialidades); // Criar um funcionário
router.get('/', especialidade.especialidadesController.buscarEspecialidades); // Busca todos os funcionários
router.get('/:id', especialidade.especialidadesController.buscarEspecialidadesPorId); // Busca um funcionário por ID
router.put('/:id', especialidade.especialidadesController.editarEspecialidades); // Atualiza um funcionário por ID
router.put('/:id', especialidade.especialidadesController.cancelarEspecialidades); //Cancela um funcionário por ID

module.exports = router;
