const express = require('express');
const router = express.Router();
const studentsController = require('../controller/students');

/**
 * @swagger
 * tags:
 *   - name: Students
 *     description: Operações relacionadas a Estudantes
 */

/**
 * @swagger
 * /api/daw/requests/students:
 *   get:
 *     tags:
 *       - Students
 *     summary: Retorna todos os estudantes
 *     description: Obtém a lista completa de estudantes
 *     responses:
 *       200:
 *         description: Estudantes encontrados com sucesso
 *       500:
 *         description: Erro ao buscar estudantes
 */
router.get('/', studentsController.getAll);

/**
 * @swagger
 * /api/daw/requests/students/{id}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Retorna um estudante por ID
 *     description: Obtém um estudante específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do estudante
 *     responses:
 *       200:
 *         description: Estudante encontrado com sucesso
 *       500:
 *         description: Erro ao buscar estudante por ID
 */
router.get('/:id', studentsController.getById);

/**
 * @swagger
 * /api/daw/requests/students:
 *   post:
 *     tags:
 *       - Students
 *     summary: Cria um novo estudante
 *     description: Adiciona um novo estudante ao sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - parents
 *               - phone_number
 *               - special_needs
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               parents:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               special_needs:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Estudante criado com sucesso
 *       500:
 *         description: Erro ao criar estudante
 */
router.post('/', studentsController.create);

/**
 * @swagger
 * /api/daw/requests/students/{id}:
 *   put:
 *     tags:
 *       - Students
 *     summary: Atualiza um estudante
 *     description: Atualiza os dados de um estudante existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do estudante a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               parents:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               special_needs:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Estudante atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar estudante
 */
router.put('/:id', studentsController.update);

/**
 * @swagger
 * /api/daw/requests/students/{id}:
 *   delete:
 *     tags:
 *       - Students
 *     summary: Deleta um estudante
 *     description: Remove um estudante do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do estudante a ser deletado
 *     responses:
 *       200:
 *         description: Estudante deletado com sucesso
 *       500:
 *         description: Erro ao deletar estudante
 */
router.delete('/:id', studentsController.delete);

module.exports = router;
