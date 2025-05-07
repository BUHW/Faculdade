"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphEntity = void 0;
class GraphEntity {
    constructor() {
        this._listaAdjacente = new Map();
    }
    adicionarVertice(vertece) {
        const { nome } = vertece;
        if (!this._listaAdjacente.has(nome)) {
            this._listaAdjacente.set(nome, []);
        }
    }
    adicionarAresta(v1, v2) {
        var _a, _b;
        this.adicionarVertice(v1);
        this.adicionarVertice(v2);
        (_a = this._listaAdjacente.get(v1.nome)) === null || _a === void 0 ? void 0 : _a.push(v2.nome);
        (_b = this._listaAdjacente.get(v2.nome)) === null || _b === void 0 ? void 0 : _b.push(v1.nome);
    }
    get listaAdjacente() {
        return this._listaAdjacente;
    }
}
exports.GraphEntity = GraphEntity;
//# sourceMappingURL=Graph.entity.js.map