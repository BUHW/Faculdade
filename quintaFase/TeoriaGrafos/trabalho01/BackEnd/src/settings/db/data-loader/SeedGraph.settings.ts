import { GraphEntity } from "../../../domain/entities/Graph.entity";
import { VertexEntity } from "../../../domain/entities/Vertex.entity";
import path from "path";
import fs from 'fs';

export class SeedGraphSettings {
    public static tipoMapa: Record<string, 'ator' | 'filme'> = {};

    public static carregarDadosJson(filePath: string): GraphEntity {
        const data = fs.readFileSync(path.resolve(filePath), 'utf-8');
        const filmes = JSON.parse(data) as { title: string; cast: string[] }[];

        const grafo = new GraphEntity();

        for (const filme of filmes) {
            const { title, cast } = filme;

            this.tipoMapa[title] = 'filme';
            cast.forEach(ator => this.tipoMapa[ator] = 'ator');

            for (const ator of cast) {
                const titleVertex: VertexEntity = new VertexEntity({ nome: title });
                const atorVertex: VertexEntity = new VertexEntity({nome: ator});

                grafo.adicionarAresta(titleVertex, atorVertex);
                grafo.adicionarAresta(atorVertex, titleVertex);
            }
        }

        return grafo;
    }
}