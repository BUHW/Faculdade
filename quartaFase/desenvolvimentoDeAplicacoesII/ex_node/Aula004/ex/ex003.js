const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let data = [];

if (fs.existsSync('data.json')) {
    const arquivo = fs.readFileSync('data.json', 'utf8');
    try {
        data = JSON.parse(arquivo);
        if (!Array.isArray(data)) {
            data = [];
        }
    } catch (e) {
        console.error('Erro ao analisar o arquivo JSON:', e);
        data = [];
    }
    console.log('Conteúdo do arquivo data.json:', data);
}

function digitaPalavra() {
    rl.question('Digite a categoria (aluno, disciplina, faculdade) ou pressione Enter para finalizar: ', (categoria) => {
        if (!categoria || !['aluno', 'disciplina', 'faculdade'].includes(categoria)) {
            saveDataToFile();
            rl.close();
            return;
        }

        rl.question(`Digite a palavra para adicionar em ${categoria}: `, (input) => {
            let palavra = input.trim();
            if (palavra) {
                let aula = data.find(item => item.aula[categoria] === palavra);
                if (aula) {
                    console.log(`A palavra "${palavra}" já existe na categoria "${categoria}".`);
                } else {
                    aula = data.find(item => item.aula[categoria] === "");
                    if (!aula) {
                        aula = { aula: { aluno: "", disciplina: "", faculdade: "" } };
                        data.push(aula);
                    }
                    aula.aula[categoria] = palavra;
                }
            }

            digitaPalavra();
        });
    });
}

function saveDataToFile() {
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFile('data.json', jsonData, (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
        } else {
            console.log('Dados salvos com sucesso no arquivo data.json');
        }
    });
}

digitaPalavra();

module.exports = { digitaPalavra };