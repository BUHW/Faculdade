const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { executarRotinaVacuum } = require("./usecases/Vacuum");
const { realizarBackup } = require("./usecases/BackupCriptografar");
const { compactarBackup } = require("./usecases/BackupCompactar");
const { apagarBackupsAntigos } = require("./usecases/AntigosExcluir");
const { copiarBackupsRestantes } = require("./usecases/BackupCopiar");
const { sendEmailErro } = require("./usecases/EmailErroEnviar");
const conf = require('../config.json');

const logFilePath = path.join(__dirname, `processo_log_${moment().format('YYYYMMDD_HHmmss')}.log`);

function log(message) {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const logMessage = `${timestamp} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage, (err) => {
        if (err) throw err;
    });
}

async function processoIniciar() {
    try {
        log("Iniciando processo de rotina Vacuum.");
        await executarRotinaVacuum(conf.opcoes);
        log("Rotina Vacuum concluída.");

        log("Iniciando processo de backup.");
        await realizarBackup(conf.caminho_destino, conf.caminho_copia_adicional, conf.quantidade_manter);
        log("Backup concluído.");

        log("Iniciando compactação do backup.");
        await compactarBackup(conf.caminho_destino, conf.senha, conf.caminho_destino);
        log("Compactação do backup concluída.");

        log("Excluindo backups antigos.");
        apagarBackupsAntigos(conf.caminho_destino, conf.quantidade_manter_apagar);
        log("Backups antigos excluídos.");

        log("Copiando backups restantes.");
        copiarBackupsRestantes(conf.caminho_destino, conf.caminho_copia_adicional);
        log("Cópia dos backups concluída.");

        log("Processo concluído com sucesso.");
        processoFinalizar()
    } catch (error) {
        log(`Erro no processo: ${error.message}`);
        await sendEmailErro(error);
        throw error;
    }
}

function processoFinalizar() {
    try {
        const logContent = fs.readFileSync(logFilePath, 'utf-8');
        if (!logContent.includes('Erro')) {
            log("Todos os processos foram bem-sucedidos. Excluindo arquivos de log.");
            fs.unlinkSync(logFilePath);
        } else {
            log("O processo encontrou erros. Mantendo o arquivo de log para análise.");
        }
    } catch (error) {
        log(`Erro ao finalizar processo: ${error.message}`);
    }
}

module.exports = {
    processoIniciar
};
