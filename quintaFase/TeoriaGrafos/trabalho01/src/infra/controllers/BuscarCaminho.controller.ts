import { BuscarCaminhoMaisCurtoUseCase } from "@src/application/usecases/BuscarCaminhoMaisCurto.usecase";
import { Request, Response } from 'express';

export class BuscarCaminhoController {
    constructor(private readonly useCase: BuscarCaminhoMaisCurtoUseCase) { }

    public executar(req: Request, res: Response): Response {
        try {
            const { atorOrigem, atorDestino } = req.body;

            if (!atorOrigem || !atorDestino) {
                return res.status(400).json({ mensagem: 'Origem e destino são obrigatórios.' });
            }

            const resultado = this.useCase.executar({ atorOrigem, atorDestino });

            if (resultado.length === 0) {
                return res.status(404).json({ mensagem: 'Nenhum caminho encontrado.' });
            }

            return res.status(200).json({
                caminho: resultado,
                comprimento: resultado.length - 1,
            });
        } catch (error) {
            console.error('Erro ao buscar caminho:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}