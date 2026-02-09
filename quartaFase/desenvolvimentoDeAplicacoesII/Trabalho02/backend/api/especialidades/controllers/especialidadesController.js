const buscarEspecialidadesPorIdUseCase = require('./usecases/buscarEspecialidadesPorIdUseCase');
const buscarEspecialidadesUseCase = require('./usecases/buscarEspecialidadesUseCase');
const cancelarEspecialidadesUseCase = require('./usecases/cancelarEspecialidadesUseCase');
const criarEspecialidadesUseCase = require('./usecases/criarEspecialidadesUseCase');
const editarEspecialidadesUseCase = require('./usecases/editarEspecialidadesUseCase');

exports.especialidadesController = {
    buscarEspecialidadesPorId: buscarEspecialidadesPorIdUseCase.buscarEspecialidadesPorId,
    buscarEspecialidades: buscarEspecialidadesUseCase.buscarEspecialidades,
    cancelarEspecialidades: cancelarEspecialidadesUseCase.cancelarEspecialidades,
    criarEspecialidades: criarEspecialidadesUseCase.criarEspecialidades,
    editarEspecialidades: editarEspecialidadesUseCase.editarEspecialidades
}