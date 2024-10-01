const express = require('express');
const router = express.Router();
const professionalsController = require('../controller/professionals');

/**
 * @swagger
 * tags:
 *   - name: Profissionals
 *     description: Operações relacionadas a Profissionais
 */

/**
 * @swagger
 * /professionals:
 *   get:
 *     tags:
 *       - Profissionals
 *     summary: Retorna todos os profissionais
 *     description: Obtém a lista completa de profissionais
 *     responses:
 *       200:
 *         description: Profissionais encontrados com sucesso
 *       500:
 *         description: Erro ao buscar profissionais
 */
router.get('/', professionalsController.getAll);

/**
 * @swagger
 * /professionals/{id}:
 *   get:
 *     tags:
 *       - Profissionals
 *     summary: Retorna um profissional por ID
 *     description: Obtém um profissional específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do profissional
 *     responses:
 *       200:
 *         description: Profissional encontrado com sucesso
 *       500:
 *         description: Erro ao buscar profissional por ID
 */
router.get('/:id', professionalsController.getById);

/**
 * @swagger
 * /professionals:
 *   post:
 *     tags:
 *       - Profissionals
 *     summary: Cria um novo profissional
 *     description: Adiciona um novo profissional ao sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specialty
 *               - contact
 *               - phone_number
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *               contact:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Profissional criado com sucesso
 *       500:
 *         description: Erro ao criar profissional
 */
router.post('/', professionalsController.create);

/**
 * @swagger
 * /professionals/{id}:
 *   put:
 *     tags:
 *       - Profissionals
 *     summary: Atualiza um profissional
 *     description: Atualiza os dados de um profissional existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do profissional a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *               contact:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Profissional atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar profissional
 */
router.put('/:id', professionalsController.update);

/**
 * @swagger
 * /professionals/{id}:
 *   delete:
 *     tags:
 *       - Profissionals
 *     summary: Deleta um profissional
 *     description: Remove um profissional do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do profissional a ser deletado
 *     responses:
 *       200:
 *         description: Profissional deletado com sucesso
 *       500:
 *         description: Erro ao deletar profissional
 */
router.delete('/:id', professionalsController.delete);

module.exports = router;
