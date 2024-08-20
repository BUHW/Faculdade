const ex001 = require('./ex/ex001')
const ex003 = require('./ex/ex003')

function gerarArrayAleatorio(tamanho) {
    const array = [];
    for (let i = 0; i < tamanho; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
        array.push(numeroAleatorio);
    }
    return array;
}

ex001.sum(gerarArrayAleatorio(20));
ex003.digitaPalavra();