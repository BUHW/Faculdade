const express = require('express');
const router = express.Router();
const eventsController = require('../controller/events');

/**
 * @swagger
 * tags:
 *   - name: Events
 *     description: Operações relacionadas a eventos
 */

/**
 * @swagger
 * /api/daw/requests/events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Retorna todos os eventos
 *     description: Obtém a lista completa de eventos
 *     responses:
 *       200:
 *         description: Eventos encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   location:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: boolean
 *       500:
 *         description: Erro ao buscar eventos
 */
router.get('/', eventsController.getAll);

/**
 * @swagger
 * /api/daw/requests/events/{id}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Retorna um evento por ID
 *     description: Obtém um evento específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 location:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       500:
 *         description: Erro ao buscar evento por ID
 */
router.get('/:id', eventsController.getById);

/**
 * @swagger
 * /api/daw/requests/events:
 *   post:
 *     tags:
 *       - Events
 *     summary: Cria um novo evento
 *     description: Adiciona um novo evento ao sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - location
 *               - description
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Evento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 location:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       500:
 *         description: Erro ao criar evento
 */
router.post('/', eventsController.create);

/**
 * @swagger
 * /api/daw/requests/events/{id}:
 *   put:
 *     tags:
 *       - Events
 *     summary: Atualiza um evento
 *     description: Atualiza os dados de um evento existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do evento a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 location:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       500:
 *         description: Erro ao atualizar evento
 */
router.put('/:id', eventsController.update);

/**
 * @swagger
 * /api/daw/requests/events/{id}:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Deleta um evento
 *     description: Remove um evento do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do evento a ser deletado
 *     responses:
 *       200:
 *         description: Evento deletado com sucesso
 *       500:
 *         description: Erro ao deletar evento
 */
router.delete('/:id', eventsController.delete);

module.exports = router;