import { BuscarAtoresUseCase } from "@src/application/usecases/BuscarAtores.usecase";
import { Request, Response } from 'express';

export class BuscarAtoresController {
    constructor(private readonly useCase: BuscarAtoresUseCase) { }

    public executar(req: Request, res: Response): Response {
        try {
            const resultado = this.useCase.executar();

            if (resultado.length === 0) {
                return res.status(404).json({ mensagem: 'Não existe ator' });
            }

            return res.status(200).json(resultado);
        } catch (error) {
            console.error('Erro ao buscar atores:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}