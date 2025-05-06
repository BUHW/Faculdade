import { GraphEntity } from "@src/domain/entities/Graph.entity";
import { BuscarCaminhoInputDTO } from "@src/infra/controllers/dto/input/BuscarCaminhoInputDTO";
import { GraphService } from "../services/Graph.service";

export class BuscarCaminhosComLimiteUseCase {
  private readonly service: GraphService;

  constructor(
    grafo: GraphEntity,
    tipoMapa: Record<string, 'ator' | 'filme'>
  ) {
    this.service = new GraphService(grafo, tipoMapa);
  }

  public executarPaginado(input: BuscarCaminhoInputDTO, limite: number, pagina: number, tamanho: number): string[][] {
    const todos = this.service.buscarTodosCaminhosComLimite(input.atorOrigem, input.atorDestino, limite);

    const inicio = (pagina - 1) * tamanho;
    const fim = inicio + tamanho;

    return todos.slice(inicio, fim);
  }

  public getGrafoRaw(): Map<string, Set<string>> {
    return this.service.getGrafo();
  }

  public getTipoMapa(): Record<string, 'ator' | 'filme'> {
    return this.service.getTipoMapa();
  }
}