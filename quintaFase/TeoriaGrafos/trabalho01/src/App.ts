import express, { Request, Response } from 'express';
import { SeedGraphSettings } from './settings/db/data-loader/SeedGraph.settings';
import { BuscarCaminhoMaisCurtoUseCase } from './application/usecases/BuscarCaminhoMaisCurto.usecase';
import { BuscarCaminhoController } from './infra/controllers/BuscarCaminho.controller';
import { BuscarCaminhosComLimiteUseCase } from './application/usecases/BuscarCaminhoComLimite.usecase';
import { BuscarCaminhosComLimiteController } from './infra/controllers/BuscarCaminhoComLimite.controller';

const app = express();
app.use(express.json());
const PORT = 8090;

const grafo = SeedGraphSettings.carregarDadosJson('src/settings/db/db_movies.json');
const tipoMapa = SeedGraphSettings.tipoMapa;

const useCase = new BuscarCaminhoMaisCurtoUseCase(grafo, tipoMapa);
const controller = new BuscarCaminhoController(useCase);

const useCaseComLimite = new BuscarCaminhosComLimiteUseCase(grafo, tipoMapa);
const controllerComLimite = new BuscarCaminhosComLimiteController(useCaseComLimite);

app.post('/buscar-caminho', (req: Request, res: Response) => {
  controller.executar(req, res);
});

app.post('/buscar-caminho-limite', (req: Request, res: Response) => {
  controllerComLimite.executar(req, res)
});

app.listen(PORT, () => {
  console.log('Servidor Rodando na porta:', PORT);
});
