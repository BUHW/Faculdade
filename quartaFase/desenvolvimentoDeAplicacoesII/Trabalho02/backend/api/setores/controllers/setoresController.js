const buscarSetoresPorIdUseCase = require('./usecases/buscarSetoresPorIdUseCase');
const buscarSetoresUseCase = require('./usecases/buscarSetoresUseCase');
const cancelarSetoresUseCase = require('./usecases/cancelarSetoresUseCase');
const criarSetoresUseCase = require('./usecases/criarSetoresUseCase');
const editarSetoresUseCase = require('./usecases/editarSetoresUseCase');

exports.setoresController = {
    buscarSetoresPorId: buscarSetoresPorIdUseCase.buscarSetoresPorId,
    buscarSetores: buscarSetoresUseCase.buscarSetores,
    cancelarSetores: cancelarSetoresUseCase.cancelarSetores,
    criarSetores: criarSetoresUseCase.criarSetores,
    editarSetores: editarSetoresUseCase.editarSetores
}