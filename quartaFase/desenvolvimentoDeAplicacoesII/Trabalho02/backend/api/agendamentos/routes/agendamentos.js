const express = require('express');
const router = express.Router();
const agendamento = require('../controllers/agendamentosController');

router.post('/', agendamento.agendamentosController.criarAgendamentos); // Criar um agendamento
router.get('/', agendamento.agendamentosController.buscarAgendamentos); // Busca todos os agendamentos
router.get('/:id', agendamento.agendamentosController.buscarAgendamentosPorId); // Busca um agendamento por ID
router.put('/:id', agendamento.agendamentosController.editarAgendamentos); // Atualiza um agendamento por ID
router.put('/:id', agendamento.agendamentosController.cancelarAgendamentos); //Cancela um agendamento por ID

module.exports = router;
