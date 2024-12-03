const buscarResponsaveisPorIdUseCase = require('./usecases/buscarResponsaveisPorIdUseCase');
const buscarResponsaveisUseCase = require('./usecases/buscarResponsaveisUseCase');
const cancelarResponsaveisUseCase = require('./usecases/cancelarResponsaveisUseCase');
const criarResponsaveisUseCase = require('./usecases/criarResponsaveisUseCase');
const editarResponsaveisUseCase = require('./usecases/editarResponsaveisUseCase');

exports.responsaveisController = {
    buscarResponsaveisPorId: buscarResponsaveisPorIdUseCase.buscarResponsaveisPorId,
    buscarResponsaveis: buscarResponsaveisUseCase.buscarResponsaveis,
    cancelarResponsaveis: cancelarResponsaveisUseCase.cancelarResponsaveis,
    criarResponsaveis: criarResponsaveisUseCase.criarResponsaveis,
    editarResponsaveis: editarResponsaveisUseCase.editarResponsaveis
}
