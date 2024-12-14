const buscarUsuariosUseCase = require('./usecases/buscarUsuariosUseCase');
const criarUsuarioUseCase = require('./usecases/criarUsuarioUseCase');
const editarUsuarioUseCase = require('./usecases/editarUsuarioUseCase');
const buscarUsuarioPorIdUseCase = require('./usecases/buscarUsuarioPorIdUseCase');
const loginUseCase = require('./usecases/loginUseCase');

exports.usuariosController = {
    buscarUsuarios: buscarUsuariosUseCase.buscarUsuarios,
    criarUsuario: criarUsuarioUseCase.criarUsuario,
    editarUsuario: editarUsuarioUseCase.editarUsuario,
    buscarUsuarioPorId: buscarUsuarioPorIdUseCase.buscarUsuarioPorId,
    login: loginUseCase.login
}