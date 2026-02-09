const buscarAlunosPorIdUseCase = require('./usecases/buscarAlunosPorIdUseCase');
const buscarAlunosUseCase = require('./usecases/buscarAlunosUseCase');
const cancelarAlunosUseCase = require('./usecases/cancelarAlunosUseCase');
const criarAlunosUseCase = require('./usecases/criarAlunosUseCase');
const editarAlunosUseCase = require('./usecases/editarAlunosUseCase');

exports.alunosController = {
    buscarAlunosPorId: buscarAlunosPorIdUseCase.buscarAlunosPorId,
    buscarAlunos: buscarAlunosUseCase.buscarAlunos,
    cancelarAlunos: cancelarAlunosUseCase.cancelarAlunos,
    criarAlunos: criarAlunosUseCase.criarAlunos,
    editarAlunos: editarAlunosUseCase.editarAlunos
}