"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarCaminhosComLimiteUseCase = void 0;
const Graph_service_1 = require("../services/Graph.service");
class BuscarCaminhosComLimiteUseCase {
    constructor(grafo, tipoMapa) {
        this.service = new Graph_service_1.GraphService(grafo, tipoMapa);
    }
    executarPaginado(input, limite, pagina, tamanho) {
        const todos = this.service.buscarTodosCaminhosComLimite(input.atorOrigem, input.atorDestino, limite);
        const inicio = (pagina - 1) * tamanho;
        const fim = inicio + tamanho;
        return todos.slice(inicio, fim);
    }
    getGrafoRaw() {
        return this.service.getGrafo();
    }
    getTipoMapa() {
        return this.service.getTipoMapa();
    }
}
exports.BuscarCaminhosComLimiteUseCase = BuscarCaminhosComLimiteUseCase;
//# sourceMappingURL=BuscarCaminhoComLimite.usecase.js.map