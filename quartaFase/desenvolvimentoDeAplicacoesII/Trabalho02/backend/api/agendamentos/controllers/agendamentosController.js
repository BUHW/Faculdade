const buscarAgendamentosPorIdUseCase = require('./usecases/buscarAgendamentosPorIdUseCase');
const buscarAgendamentosUseCase = require('./usecases/buscarAgendamentosUseCase');
const cancelarAgendamentosUseCase = require('./usecases/cancelarAgendamentosUseCase');
const criarAgendamentosUseCase = require('./usecases/criarAgendamentosUseCase');
const editarAgendamentosUseCase = require('./usecases/editarAgendamentosUseCase');

exports.agendamentosController = {
    buscarAgendamentosPorId: buscarAgendamentosPorIdUseCase.buscarAgendamentosPorId,
    buscarAgendamentos: buscarAgendamentosUseCase.buscarAgendamentos,
    cancelarAgendamentos: cancelarAgendamentosUseCase.cancelarAgendamentos,
    criarAgendamentos: criarAgendamentosUseCase.criarAgendamentos,
    editarAgendamentos: editarAgendamentosUseCase.editarAgendamentos
}