const express = require('express');
const router = express.Router();
const aluno = require('../controllers/alunosController');

router.post('/', aluno.alunosController.criarAlunos); // Criar um aluno
router.get('/', aluno.alunosController.buscarAlunos); // Busca todos os alunos
router.get('/:id', aluno.alunosController.buscarAlunosPorId); // Busca um aluno por ID
router.put('/:id', aluno.alunosController.editarAlunos); // Atualiza um aluno por ID
router.put('/:id', aluno.alunosController.cancelarAlunos); //Cancela um aluno por ID

module.exports = router;
