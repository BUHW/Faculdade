const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacher');

/**
 * @swagger
 * tags:
 *   - name: Teacher
 *     description: Operações relacionadas a professores
 */


/**
 * @swagger
 * /teachers:
 *   get:
 *     tags:
 *       - Teacher
 *     summary: Retorna todos os professores
 *     description: Obtém a lista completa de professores
 *     responses:
 *       200:
 *         description: Professores encontrados com sucesso
 *       500:
 *         description: Erro ao buscar professores
 */
router.get('/', teacherController.getAll);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     tags:
 *       - Teacher
 *     summary: Retorna um professor por ID
 *     description: Obtém um professor específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do professor
 *     responses:
 *       200:
 *         description: Professor encontrado com sucesso
 *       500:
 *         description: Erro ao buscar professor por ID
 */
router.get('/:id', teacherController.getById);

/**
 * @swagger
 * /teachers:
 *   post:
 *     tags:
 *       - Teacher
 *     summary: Cria um novo professor
 *     description: Adiciona um novo professor ao sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - school_disciplines
 *               - contact
 *               - phone_number
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               school_disciplines:
 *                 type: array
 *                 items:
 *                   type: string
 *               contact:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Professor criado com sucesso
 *       500:
 *         description: Erro ao criar professor
 */
router.post('/', teacherController.create);

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     tags:
 *       - Teacher
 *     summary: Atualiza um professor
 *     description: Atualiza os dados de um professor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do professor a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               school_disciplines:
 *                 type: array
 *                 items:
 *                   type: string
 *               contact:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar professor
 */
router.put('/:id', teacherController.update);

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     tags:
 *       - Teacher
 *     summary: Deleta um professor
 *     description: Remove um professor do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do professor a ser deletado
 *     responses:
 *       200:
 *         description: Professor deletado com sucesso
 *       500:
 *         description: Erro ao deletar professor
 */
router.delete('/:id', teacherController.delete);

module.exports = router;
