import express, { Request, Response } from 'express';
import cors from "cors";
import { SeedGraphSettings } from './settings/db/data-loader/SeedGraph.settings';
import { BuscarCaminhoMaisCurtoUseCase } from './application/usecases/BuscarCaminhoMaisCurto.usecase';
import { BuscarCaminhoController } from './infra/controllers/BuscarCaminho.controller';
import { BuscarCaminhosComLimiteUseCase } from './application/usecases/BuscarCaminhoComLimite.usecase';
import { BuscarCaminhosComLimiteController } from './infra/controllers/BuscarCaminhoComLimite.controller';
import { BuscarAtoresUseCase } from './application/usecases/BuscarAtores.usecase';
import { BuscarAtoresController } from './infra/controllers/BuscarAtoresController';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8090;

const grafo = SeedGraphSettings.carregarDadosJson('src/settings/db/db_movies.json');
const tipoMapa = SeedGraphSettings.tipoMapa;

const useCase = new BuscarCaminhoMaisCurtoUseCase(grafo, tipoMapa);
const controller = new BuscarCaminhoController(useCase);

const useCaseComLimite = new BuscarCaminhosComLimiteUseCase(grafo, tipoMapa);
const controllerComLimite = new BuscarCaminhosComLimiteController(useCaseComLimite);

const atoresUseCase = new BuscarAtoresUseCase(grafo, tipoMapa);
const atoresController = new BuscarAtoresController(atoresUseCase);


app.post('/buscar-caminho', (req: Request, res: Response) => {
  controller.executar(req, res);
});

app.post('/buscar-caminho-limite', (req: Request, res: Response) => {
  controllerComLimite.executar(req, res)
});

app.get('/buscar-atores', (req: Request, res: Response) => {
  atoresController.executar(req, res);
})

app.listen(PORT, () => {
  console.log('Servidor Rodando na porta:', PORT);
});
