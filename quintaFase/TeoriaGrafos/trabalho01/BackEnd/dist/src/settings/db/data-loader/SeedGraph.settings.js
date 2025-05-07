"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedGraphSettings = void 0;
const Graph_entity_1 = require("../../../domain/entities/Graph.entity");
const Vertex_entity_1 = require("../../../domain/entities/Vertex.entity");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class SeedGraphSettings {
    static carregarDadosJson(filePath) {
        const data = fs_1.default.readFileSync(path_1.default.resolve(filePath), 'utf-8');
        const filmes = JSON.parse(data);
        const grafo = new Graph_entity_1.GraphEntity();
        for (const filme of filmes) {
            const { title, cast } = filme;
            this.tipoMapa[title] = 'filme';
            cast.forEach(ator => this.tipoMapa[ator] = 'ator');
            for (const ator of cast) {
                const titleVertex = new Vertex_entity_1.VertexEntity({ nome: title });
                const atorVertex = new Vertex_entity_1.VertexEntity({ nome: ator });
                grafo.adicionarAresta(titleVertex, atorVertex);
                grafo.adicionarAresta(atorVertex, titleVertex);
            }
        }
        return grafo;
    }
}
exports.SeedGraphSettings = SeedGraphSettings;
SeedGraphSettings.tipoMapa = {};
//# sourceMappingURL=SeedGraph.settings.js.map