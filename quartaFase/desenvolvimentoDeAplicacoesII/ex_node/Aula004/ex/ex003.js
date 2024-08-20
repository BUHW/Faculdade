const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let setPalavras = new Set();


if (fs.existsSync('words.json')) {
    const arquivo = fs.readFileSync('words.json', 'utf8');
    console.log('Conteúdo do arquivo words.json:', arquivo);
}

function digitaPalavra() {
    rl.question('Digite uma palavra para escrever no arquivo, (pressione a tecla Enter para finalizaro processo): ', (input) => {
        let word = input.trim();
        if (word) {
            setPalavras.add(word);
        }

        if (word === '') {
            saveWordsToFile();
            rl.close();
        } else {
            digitaPalavra();
        }
    });
}

function saveWordsToFile() {
    const arrayPalavras = Array.from(setPalavras);
    const jsonData = JSON.stringify(arrayPalavras, null, 2);

    fs.writeFile('words.json', jsonData, (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
        } else {
            console.log('Palavras salvas com sucesso no arquivo words.json');
        }
    });
}

module.exports = { digitaPalavra };
