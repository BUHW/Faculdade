"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
function reconstruirGrafo(serializado) {
    return new Map(serializado.map(([k, v]) => [k, new Set(v)]));
}
function buscarTodosCaminhosComLimitePaginado(grafo, origem, destino, limite, pagina, tamanho) {
    const resultados = [];
    const inicio = (pagina - 1) * tamanho;
    const fim = inicio + tamanho;
    let totalEncontrados = 0;
    const fila = [[origem, [origem], new Set([origem])]];
    while (fila.length > 0) {
        const [atual, caminho, visitados] = fila.shift();
        const nivel = caminho.length - 1;
        if (nivel > limite)
            continue;
        const vizinhos = grafo.get(atual);
        if (!vizinhos)
            continue;
        for (const vizinho of vizinhos) {
            if (visitados.has(vizinho))
                continue;
            const novoCaminho = [...caminho, vizinho];
            const novoVisitados = new Set(visitados);
            novoVisitados.add(vizinho);
            if (vizinho === destino) {
                if (totalEncontrados >= inicio && totalEncontrados < fim) {
                    resultados.push(novoCaminho);
                }
                totalEncontrados++;
                if (totalEncontrados >= fim) {
                    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(resultados);
                    return resultados;
                }
            }
            else {
                fila.push([vizinho, novoCaminho, novoVisitados]);
            }
        }
    }
    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(resultados);
    return resultados;
}
const { grafo, origem, destino, limite, pagina, tamanho } = worker_threads_1.workerData;
const grafoReconstruido = reconstruirGrafo(grafo);
if (!grafoReconstruido.has(origem) || !grafoReconstruido.has(destino)) {
    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage([]);
}
else {
    buscarTodosCaminhosComLimitePaginado(grafoReconstruido, origem, destino, limite, pagina, tamanho);
}
//# sourceMappingURL=Worker.js.map