"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VertexEntity = void 0;
class VertexEntity {
    constructor(data) {
        this.data = data;
    }
    static executar(input) {
        return new VertexEntity(input);
    }
    get nome() {
        return this.data.nome;
    }
}
exports.VertexEntity = VertexEntity;
//# sourceMappingURL=Vertex.entity.js.map