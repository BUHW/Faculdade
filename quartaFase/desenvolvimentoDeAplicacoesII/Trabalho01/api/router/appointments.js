const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointments');

/**
 * @swagger
 * tags:
 *   - name: Appointments
 *     description: Operações relacionadas a agendamentos
 */

/**
 * @swagger
 * /api/daw/requests/appointments:
 *   get:
 *     tags:
 *       - Appointments
 *     summary: Retorna todos os agendamentos
 *     description: Obtém a lista completa de agendamentos
 *     responses:
 *       200:
 *         description: Agendamentos encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   specialty:
 *                     type: string
 *                   comments:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   student:
 *                     type: string
 *                   professional:
 *                     type: string
 *       500:
 *         description: Erro ao buscar agendamentos
 */
router.get('/', appointmentController.getAll);

/**
 * @swagger
 * /api/daw/requests/appointments/{id}:
 *   get:
 *     tags:
 *       - Appointments
 *     summary: Retorna um agendamento por ID
 *     description: Obtém um agendamento específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Agendamento encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 specialty:
 *                   type: string
 *                 comments:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 student:
 *                   type: string
 *                 professional:
 *                   type: string
 *       500:
 *         description: Erro ao buscar agendamento por ID
 */
router.get('/:id', appointmentController.getById);

/**
 * @swagger
 * /api/daw/requests/appointments:
 *   post:
 *     tags:
 *       - Appointments
 *     summary: Cria um novo agendamento
 *     description: Adiciona um novo agendamento ao sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - specialty
 *               - date
 *               - student
 *               - professional
 *             properties:
 *               specialty:
 *                 type: string
 *               comments:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               student:
 *                 type: string
 *               professional:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 specialty:
 *                   type: string
 *                 comments:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 student:
 *                   type: string
 *                 professional:
 *                   type: string
 *       500:
 *         description: Erro ao criar agendamento
 */
router.post('/', appointmentController.create);

/**
 * @swagger
 * /api/daw/requests/appointments/{id}:
 *   put:
 *     tags:
 *       - Appointments
 *     summary: Atualiza um agendamento
 *     description: Atualiza os dados de um agendamento existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do agendamento a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialty:
 *                 type: string
 *               comments:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               student:
 *                 type: string
 *               professional:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 specialty:
 *                   type: string
 *                 comments:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 student:
 *                   type: string
 *                 professional:
 *                   type: string
 *       500:
 *         description: Erro ao atualizar agendamento
 */
router.put('/:id', appointmentController.update);

/**
 * @swagger
 * /api/daw/requests/appointments/{id}:
 *   delete:
 *     tags:
 *       - Appointments
 *     summary: Deleta um agendamento
 *     description: Remove um agendamento do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do agendamento a ser deletado
 *     responses:
 *       200:
 *         description: Agendamento deletado com sucesso
 *       500:
 *         description: Erro ao deletar agendamento
 */
router.delete('/:id', appointmentController.delete);

module.exports = router;
