import { VertexData } from "./Vertex.entity";

export class GraphEntity {
    private _listaAdjacente: Map<string, string[]> = new Map();

    public adicionarVertice(vertece: VertexData): void {
        const { nome } = vertece;
        if (!this._listaAdjacente.has(nome)) {
            this._listaAdjacente.set(nome, []);
        }
    }

    public adicionarAresta(v1: VertexData, v2: VertexData): void {
        this.adicionarVertice(v1);
        this.adicionarVertice(v2);
        this._listaAdjacente.get(v1.nome)?.push(v2.nome);
        this._listaAdjacente.get(v2.nome)?.push(v1.nome);
    }

    public get listaAdjacente(): Map<string, string[]> {
        return this._listaAdjacente;
    }
}