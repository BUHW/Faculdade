"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphService = void 0;
class GraphService {
    constructor(grafo, tipoMapa) {
        this.grafo = grafo;
        this.tipoMapa = tipoMapa;
    }
    buscarCaminhoMaisCurto(origem, destino) {
        if (origem === destino)
            return [{ tipo: this.tipoDoVertice(origem), nome: origem }];
        const visitados = new Set();
        const fila = [[origem, [origem]]];
        while (fila.length > 0) {
            const [atual, caminho] = fila.shift();
            if (visitados.has(atual))
                continue;
            visitados.add(atual);
            const vizinhos = this.grafo.listaAdjacente.get(atual);
            if (!vizinhos)
                continue;
            for (const vizinho of vizinhos) {
                if (visitados.has(vizinho))
                    continue;
                const novoCaminho = [...caminho, vizinho];
                if (vizinho === destino) {
                    return novoCaminho.map(nome => ({
                        tipo: this.tipoDoVertice(nome),
                        nome
                    }));
                }
                fila.push([vizinho, novoCaminho]);
            }
        }
        return [];
    }
    buscarTodosCaminhosComLimite(origem, destino, limite = 6) {
        const resultados = [];
        const fila = [[origem, [origem]]];
        const visitadosPorNivel = new Map();
        while (fila.length > 0) {
            const [atual, caminho] = fila.shift();
            const nivel = caminho.length - 1;
            if (nivel > limite)
                continue;
            if (!visitadosPorNivel.has(nivel)) {
                visitadosPorNivel.set(nivel, new Set());
            }
            if (visitadosPorNivel.get(nivel).has(atual)) {
                continue;
            }
            visitadosPorNivel.get(nivel).add(atual);
            const vizinhos = this.grafo.listaAdjacente.get(atual);
            if (!vizinhos)
                continue;
            for (const vizinho of vizinhos) {
                if (caminho.includes(vizinho))
                    continue;
                const novoCaminho = [...caminho, vizinho];
                if (vizinho === destino) {
                    resultados.push(novoCaminho);
                }
                else {
                    fila.push([vizinho, novoCaminho]);
                }
            }
        }
        return resultados;
    }
    getTipoMapa() {
        return this.tipoMapa;
    }
    getGrafo() {
        return new Map(Array.from(this.grafo.listaAdjacente.entries()).map(([key, value]) => [key, new Set(value)]));
    }
    tipoDoVertice(nome) {
        return this.tipoMapa[nome] || 'ator';
    }
}
exports.GraphService = GraphService;
//# sourceMappingURL=Graph.service.js.map