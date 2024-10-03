const { sendEmailErro } = require('./EmailErroEnviar');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const crypto = require('crypto');

function criptografarArquivo(arquivoOriginal, arquivoCriptografado, chave, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(chave), iv);
  const input = fs.createReadStream(arquivoOriginal);
  const output = fs.createWriteStream(arquivoCriptografado);

  input.pipe(cipher).pipe(output);

  output.on('finish', () => {
    console.log(`Arquivo criptografado com sucesso: ${arquivoCriptografado}`);
    fs.unlinkSync(arquivoOriginal);
  });
}

async function realizarBackup(caminho_destino, caminho_copia_adicional, quantidade_manter) {
  try {
    if (!fs.existsSync(caminho_destino)) {
      fs.mkdirSync(caminho_destino, { recursive: true });
      console.log(`Diretório criado: ${caminho_destino}`);
    }

    if (caminho_copia_adicional && !fs.existsSync(caminho_copia_adicional)) {
      fs.mkdirSync(caminho_copia_adicional, { recursive: true });
      console.log(`Diretório adicional criado: ${caminho_copia_adicional}`);
    }

    const backupFileName = `backup_${new Date().toISOString().replace(/[:.]/g, '-')}.sql`;
    const backupFilePath = path.join(caminho_destino, backupFileName);

    const backupCommand = `pg_dump -U ${process.env.USER_DB} -h ${process.env.HOST} -F c -b -v -f ${backupFilePath} ${process.env.DB}`;
    
    exec(backupCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao realizar backup: ${error.message}`);
        return;
      }
      console.log(`Backup realizado com sucesso: ${backupFileName}`);

      const chave = crypto.randomBytes(32);
      const iv = crypto.randomBytes(16);

      const arquivoCriptografado = `${backupFilePath}.enc`;
      criptografarArquivo(backupFilePath, arquivoCriptografado, chave, iv);

      fs.writeFileSync(`${arquivoCriptografado}.key`, chave.toString('hex'));
      fs.writeFileSync(`${arquivoCriptografado}.iv`, iv.toString('hex'));

      if (quantidade_manter) {
        gerenciarBackups(caminho_destino, quantidade_manter);
      }

      if (caminho_copia_adicional) {
        copiarBackup(caminho_copia_adicional, arquivoCriptografado);
      }
    });
  } catch (error) {
    sendEmailErro(error);
  }
}

function gerenciarBackups(caminho_destino, quantidade_manter) {
  fs.readdir(caminho_destino, (err, files) => {
    if (err) {
      return console.error('Erro ao ler o diretório de backups:', err);
    }

    const backupFiles = files
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(caminho_destino, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    if (backupFiles.length > quantidade_manter) {
      const backupsParaDeletar = backupFiles.slice(quantidade_manter);
      backupsParaDeletar.forEach(backup => {
        fs.unlink(path.join(caminho_destino, backup.name), err => {
          if (err) console.error(`Erro ao deletar backup antigo: ${err.message}`);
          else console.log(`Backup antigo deletado: ${backup.name}`);
        });
      });
    }
  });
}

function copiarBackup(caminho_copia_adicional, backupFilePath) {
  const copiaDestino = path.join(caminho_copia_adicional, path.basename(backupFilePath));
  fs.copyFile(backupFilePath, copiaDestino, (err) => {
    if (err) {
      console.error('Erro ao copiar backup para o caminho adicional:', err);
    } else {
      console.log(`Backup copiado com sucesso para o diretório adicional: ${caminho_copia_adicional}`);
    }
  });
}

module.exports = {
  realizarBackup
};
