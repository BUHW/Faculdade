const express = require('express');
const router = express.Router();
const responsavel = require('../controllers/responsaveisController');

router.post('/', responsavel.responsaveisController.criarResponsaveis); // Criar um responsável
router.get('/', responsavel.responsaveisController.buscarResponsaveis); // Busca todos os responsáveis
router.get('/:id', responsavel.responsaveisController.buscarResponsaveisPorId); // Busca um responsável por ID
router.put('/:id', responsavel.responsaveisController.editarResponsaveis); // Atualiza um responsável por ID
router.put('/:id', responsavel.responsaveisController.cancelarResponsaveis); //Cancela um responsável por ID

module.exports = router;
