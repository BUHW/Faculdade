import { GraphEntity } from "@src/domain/entities/Graph.entity";
import { BuscarCaminhoInputDTO } from "@src/infra/controllers/dto/input/BuscarCaminhoInputDTO";
import { GraphService } from "../services/Graph.service";

export class BuscarCaminhoMaisCurtoUseCase {
    private readonly service: GraphService;

    constructor(
        grafo: GraphEntity,
        tipoMapa: Record<string, 'ator' | 'filme'>
    ) {
        this.service = new GraphService(grafo, tipoMapa);
    }

    public executar(input: BuscarCaminhoInputDTO): { tipo: 'ator' | 'filme'; nome: string }[] {
        return this.service.buscarCaminhoMaisCurto(input.atorOrigem, input.atorDestino);
    }
}
