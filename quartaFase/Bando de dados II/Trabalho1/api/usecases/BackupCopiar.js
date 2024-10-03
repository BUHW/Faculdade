const { sendEmailErro } = require('./EmailErroEnviar')
const fs = require('fs');
const path = require('path');
const { send } = require('process');

function copiarBackupsRestantes(diretorioOrigem, diretorioDestino) {
  try {
    if (!fs.existsSync(diretorioDestino)) {
      fs.mkdirSync(diretorioDestino, { recursive: true });
      console.log(`Diretório de destino criado: ${diretorioDestino}`);
    }

    const arquivos = fs.readdirSync(diretorioOrigem);

    const arquivosBackups = arquivos.filter(arquivo => arquivo.endsWith('.7z'));

    arquivosBackups.forEach(arquivo => {
      const caminhoOrigem = path.join(diretorioOrigem, arquivo);
      const caminhoDestino = path.join(diretorioDestino, arquivo);

      fs.copyFileSync(caminhoOrigem, caminhoDestino);
      console.log(`Backup copiado para: ${caminhoDestino}`);
    });

    console.log('Todos os backups restantes foram copiados com sucesso.');
  } catch (error) {
    sendEmailErro(error)
  }
}

module.exports = {
  copiarBackupsRestantes,
};
