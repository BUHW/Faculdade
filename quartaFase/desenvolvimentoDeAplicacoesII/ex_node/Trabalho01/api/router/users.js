const express = require('express');
const router = express.Router();
const usersController = require('../controller/users');

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * /api/daw/requests/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retorna todos os usuários
 *     description: Obtém a lista completa de usuários
 *     responses:
 *       200:
 *         description: Usuários retornados com sucesso
 *       500:
 *         description: Erro ao buscar usuários
 */
router.get('/', usersController.getAll);

/**
 * @swagger
 * /api/daw/requests/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retorna um usuário por ID
 *     description: Obtém um usuário específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *       500:
 *         description: Erro ao processar dados do GET por id de usuário
 */
router.get('/:id', usersController.getById);

/**
 * @swagger
 * /api/daw/requests/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Cria um novo usuário
 *     description: Adiciona um novo usuário ao sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - user
 *               - pwd
 *               - level
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               user:
 *                 type: string
 *               email:
 *                 type: string
 *               pwd:
 *                 type: string
 *               level:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro ao processar dados do POST
 */
router.post('/', usersController.create);

/**
 * @swagger
 * /api/daw/requests/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Atualiza um usuário
 *     description: Atualiza os dados de um usuário existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               user:
 *                 type: string
 *               email:
 *                 type: string
 *               pwd:
 *                 type: string
 *               level:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       500:
 *         description: Erro ao processar dados do PUT
 */
router.put('/:id', usersController.update);

/**
 * @swagger
 * /api/daw/requests/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Deleta um usuário
 *     description: Remove um usuário do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       500:
 *         description: Erro ao processar dados do DELETE
 */
router.delete('/:id', usersController.delete);

/**
 * @swagger
 * /api/daw/requests/requests/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Realiza o login de um usuário
 *     description: Autentica um usuário com base no email e senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - pass
 *             properties:
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       500:
 *         description: Erro ao processar dados do POST
 */
router.post('/login', usersController.login);

module.exports = router;
