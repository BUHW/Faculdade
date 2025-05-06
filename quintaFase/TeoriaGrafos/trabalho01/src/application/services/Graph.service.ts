import { GraphEntity } from "@src/domain/entities/Graph.entity";

export class GraphService {
  constructor(
    private readonly grafo: GraphEntity,
    private readonly tipoMapa: Record<string, 'ator' | 'filme'>
  ) { }

  public buscarCaminhoMaisCurto(origem: string, destino: string): { tipo: 'ator' | 'filme'; nome: string }[] {
    if (origem === destino) return [{ tipo: this.tipoDoVertice(origem), nome: origem }];

    const visitados = new Set<string>();
    const fila: [string, string[]][] = [[origem, [origem]]];

    while (fila.length > 0) {
      const [atual, caminho] = fila.shift()!;
      if (visitados.has(atual)) continue;
      visitados.add(atual);

      const vizinhos = this.grafo.listaAdjacente.get(atual);
      if (!vizinhos) continue;

      for (const vizinho of vizinhos) {
        if (visitados.has(vizinho)) continue;

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

  public buscarTodosCaminhosComLimite(
    origem: string,
    destino: string,
    limite: number = 6
  ): string[][] {
    const resultados: string[][] = [];
    const fila: [string, string[]][] = [[origem, [origem]]];

    const visitadosPorNivel: Map<number, Set<string>> = new Map();

    while (fila.length > 0) {
      const [atual, caminho] = fila.shift()!;
      const nivel = caminho.length - 1;

      if (nivel > limite) continue;

      if (!visitadosPorNivel.has(nivel)) {
        visitadosPorNivel.set(nivel, new Set());
      }

      if (visitadosPorNivel.get(nivel)!.has(atual)) {
        continue;
      }

      visitadosPorNivel.get(nivel)!.add(atual);

      const vizinhos = this.grafo.listaAdjacente.get(atual);
      if (!vizinhos) continue;

      for (const vizinho of vizinhos) {
        if (caminho.includes(vizinho)) continue;

        const novoCaminho = [...caminho, vizinho];
        if (vizinho === destino) {
          resultados.push(novoCaminho);
        } else {
          fila.push([vizinho, novoCaminho]);
        }
      }
    }

    return resultados;
  }

  public getTipoMapa(): Record<string, 'ator' | 'filme'> {
    return this.tipoMapa;
  }

  public getGrafo(): Map<string, Set<string>> {
    return new Map(
      Array.from(this.grafo.listaAdjacente.entries()).map(
        ([key, value]) => [key, new Set(value)]
      )
    );
  }

  private tipoDoVertice(nome: string): 'ator' | 'filme' {
    return this.tipoMapa[nome] || 'ator';
  }
}
