"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SeedGraph_settings_1 = require("./settings/db/data-loader/SeedGraph.settings");
const BuscarCaminhoMaisCurto_usecase_1 = require("./application/usecases/BuscarCaminhoMaisCurto.usecase");
const BuscarCaminho_controller_1 = require("./infra/controllers/BuscarCaminho.controller");
const BuscarCaminhoComLimite_usecase_1 = require("./application/usecases/BuscarCaminhoComLimite.usecase");
const BuscarCaminhoComLimite_controller_1 = require("./infra/controllers/BuscarCaminhoComLimite.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 8090;
const grafo = SeedGraph_settings_1.SeedGraphSettings.carregarDadosJson('src/settings/db/db_movies.json');
const tipoMapa = SeedGraph_settings_1.SeedGraphSettings.tipoMapa;
const useCase = new BuscarCaminhoMaisCurto_usecase_1.BuscarCaminhoMaisCurtoUseCase(grafo, tipoMapa);
const controller = new BuscarCaminho_controller_1.BuscarCaminhoController(useCase);
const useCaseComLimite = new BuscarCaminhoComLimite_usecase_1.BuscarCaminhosComLimiteUseCase(grafo, tipoMapa);
const controllerComLimite = new BuscarCaminhoComLimite_controller_1.BuscarCaminhosComLimiteController(useCaseComLimite);
app.post('/buscar-caminho', (req, res) => {
    controller.executar(req, res);
});
app.post('/buscar-caminho-limite', (req, res) => {
    controllerComLimite.executar(req, res);
});
app.listen(PORT, () => {
    console.log('Servidor Rodando na porta:', PORT);
});
//# sourceMappingURL=App.js.map