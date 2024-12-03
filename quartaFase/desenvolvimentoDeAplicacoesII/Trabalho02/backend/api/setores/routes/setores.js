const express = require('express');
const router = express.Router();
const setor = require('../controllers/setoresController');

router.post('/', setor.setoresController.criarSetores); // Criar um aluno
router.get('/', setor.setoresController.buscarSetores); // Busca todos os setores
router.get('/:id', setor.setoresController.buscarSetoresPorId); // Busca um aluno por ID
router.put('/:id', setor.setoresController.editarSetores); // Atualiza um aluno por ID
router.put('/:id', setor.setoresController.cancelarSetores); //Cancela um aluno por ID

module.exports = router;
