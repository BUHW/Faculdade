const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuariosController');
const auth = require('../auth');

router.post('/', auth({grupo: 'usuario', permissao: 'base', cancelado: false}), usuario.usuariosController.buscarUsuarios); //Criar usuário
router.get('/',  auth({grupo: 'usuario', permissao: 'base', cancelado: false}), usuario.usuariosController.buscarUsuarios); //Busca
router.get('/:id', auth({grupo: 'usuario', permissao: 'base', cancelado: false}), usuario.usuariosController.buscarUsuarioPorId); //Busca um usuário
router.post('/login', usuario.usuariosController.login); //Login
router.put('/:id', auth({grupo: 'usuario', permissao: 'base', cancelado: false}), usuario.usuariosController.editarUsuario); //Atualiza usuário

module.exports = router;