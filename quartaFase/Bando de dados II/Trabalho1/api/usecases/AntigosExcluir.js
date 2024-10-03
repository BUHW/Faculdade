const { sendEmailErro } = require('./EmailErroEnviar')
const fs = require('fs');
const path = require('path');

function apagarBackupsAntigos(diretorioBackup, quantidadeManter) {
  try {
    const arquivos = fs.readdirSync(diretorioBackup);

    const arquivosBackups = arquivos
      .filter(arquivo => arquivo.endsWith('.7z'))
      .map(arquivo => ({
        nome: arquivo,
        tempoModificacao: fs.statSync(path.join(diretorioBackup, arquivo)).mtime.getTime(),
      }))
      .sort((a, b) => b.tempoModificacao - a.tempoModificacao);

    if (arquivosBackups.length > quantidadeManter) {
      const backupsParaDeletar = arquivosBackups.slice(quantidadeManter);

      backupsParaDeletar.forEach(backup => {
        const caminhoBackup = path.join(diretorioBackup, backup.nome);
        fs.unlinkSync(caminhoBackup);
        console.log(`Backup antigo deletado: ${backup.nome}`);
      });
    } else {
      console.log('Nenhum backup antigo para deletar.');
    }
  } catch (error) {
    sendEmailErro(error);
  }
}

module.exports = {
  apagarBackupsAntigos,
};
