"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarCaminhoMaisCurtoUseCase = void 0;
const Graph_service_1 = require("../services/Graph.service");
class BuscarCaminhoMaisCurtoUseCase {
    constructor(grafo, tipoMapa) {
        this.service = new Graph_service_1.GraphService(grafo, tipoMapa);
    }
    executar(input) {
        return this.service.buscarCaminhoMaisCurto(input.atorOrigem, input.atorDestino);
    }
}
exports.BuscarCaminhoMaisCurtoUseCase = BuscarCaminhoMaisCurtoUseCase;
//# sourceMappingURL=BuscarCaminhoMaisCurto.usecase.js.map