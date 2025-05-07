import { BuscarCaminhosComLimiteUseCase } from "@src/application/usecases/BuscarCaminhoComLimite.usecase";
import { PaginarDTO } from "@src/shared/utils/dto/PaginarDTO";
import { Request, Response } from 'express';
import path from "path";
import { Worker } from "worker_threads";

export class BuscarCaminhosComLimiteController {
    constructor(private readonly useCase: BuscarCaminhosComLimiteUseCase) { }

    public executar(req: Request, res: Response): void {
        try {
            const { atorOrigem, atorDestino } = req.body;
            const {
                page = 1,
                size = 10,
                orderBy = '',
                direction = 'desc',
                search = ''
            } = req.query as unknown as PaginarDTO;

            if (!atorOrigem || !atorDestino) {
                res.status(400).json({ mensagem: 'Origem e destino são obrigatórios.' });
                return;
            }

            const grafo = this.useCase.getGrafoRaw();
            const tipoMapa = this.useCase.getTipoMapa();

            const worker = new Worker(path.resolve('dist/Worker.js'), {
                workerData: {
                    grafo: Array.from(grafo.entries()).map(([k, v]) => [k, Array.from(v)]),
                    origem: atorOrigem,
                    destino: atorDestino,
                    limite: 6,
                    pagina: page,
                    tamanho: size
                },
            });

            worker.on('message', (caminhos: string[][]) => {
                let resultados = caminhos;

                if (search) {
                    const termo = search.toLowerCase();
                    resultados = resultados.filter(caminho =>
                        caminho.some(v => v.toLowerCase().includes(termo))
                    );
                }

                if (orderBy === 'tamanho') {
                    resultados.sort((a, b) =>
                        direction === 'asc' ? a.length - b.length : b.length - a.length
                    );
                }

                if (orderBy === 'primeiro') {
                    resultados.sort((a, b) => {
                        const nomeA = a[0].toLowerCase();
                        const nomeB = b[0].toLowerCase();
                        return direction === 'asc' ? nomeA.localeCompare(nomeB) : nomeB.localeCompare(nomeA);
                    });
                }

                const caminhosComTipo = resultados.map(caminho =>
                    caminho.map(nome => ({
                        tipo: tipoMapa[nome] || 'ator',
                        nome
                    }))
                );

                res.status(200).json({
                    caminhos: caminhosComTipo
                });
            });

            worker.on('error', (err) => {
                console.error('Erro no worker:', err);
                res.status(500).json({ mensagem: 'Erro interno ao processar os caminhos.' });
            });

        } catch (error) {
            console.error('Erro geral:', error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}
