const { sendEmailErro } = require('./EmailErroEnviar')
const path = require('path');
const fs = require('fs');
const Seven = require('node-7z');
const { extractFull } = Seven;

async function compactarBackup(caminhoArquivo, senha, destinoCompactado) {
  try {
    const arquivoCompactado = `${path.basename(caminhoArquivo, '.enc')}.7z`;
    const caminhoCompletoArquivoCompactado = path.join(destinoCompactado, arquivoCompactado);

    if (!fs.existsSync(caminhoArquivo)) {
      throw new Error('Arquivo criptografado não encontrado!');
    }

    console.log(`Compactando o arquivo criptografado: ${caminhoArquivo}...`);
    const zip = extractFull(caminhoCompletoArquivoCompactado, {
      password: senha,
      $bin: '7z', // Caminho para o executável do 7-Zip tem que ajusar confrome o sistema, meu sistema é linux
    });

    zip.add(caminhoArquivo);

    zip.on('end', () => {
      console.log(`Arquivo compactado com sucesso: ${caminhoCompletoArquivoCompactado}`);
    });

    zip.on('error', (err) => {
      console.error('Erro ao compactar o arquivo:', err);
    });
  } catch (error) {
    sendEmailErro(error);
  }
}

module.exports = {
  compactarBackup,
};
