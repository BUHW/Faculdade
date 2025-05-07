import { GraphEntity } from "@src/domain/entities/Graph.entity";
import { GraphService } from "../services/Graph.service";
import { BuscarAtoresOutputDTO } from "@src/infra/controllers/dto/output/BuscarAtoresOutPutDTO";

export class BuscarAtoresUseCase {
    private readonly service: GraphService;

    constructor(
        grafo: GraphEntity,
        tipoMapa: Record<string, 'ator' | 'filme'>
    ) {
        this.service = new GraphService(grafo, tipoMapa);
    }

    public executar(): BuscarAtoresOutputDTO[] {
        return this.service.BuscarAtores();
    }
}