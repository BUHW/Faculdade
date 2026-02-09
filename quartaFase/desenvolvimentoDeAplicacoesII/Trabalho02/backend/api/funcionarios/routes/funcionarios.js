const express = require('express');
const router = express.Router();
const funcionario = require('../controllers/funcionariosController');

router.post('/', funcionario.funcionariosController.criarFuncionarios); // Criar um funcionário
router.get('/', funcionario.funcionariosController.buscarFuncionarios); // Busca todos os funcionários
router.get('/:id', funcionario.funcionariosController.buscarFuncionariosPorId); // Busca um funcionário por ID
router.put('/:id', funcionario.funcionariosController.editarFuncionarios); // Atualiza um funcionário por ID
router.put('/:id', funcionario.funcionariosController.cancelarFuncionarios); //Cancela um funcionário por ID

module.exports = router;
