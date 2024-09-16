const path = require('path');
const fs = require('fs');

const imgData = JSON.parse(fs.readFileSync('img.json', 'utf-8'));

function findImg(nome) {
    return imgData.img.find(img => img.nome === nome);
}

function requestImg(app) {
    app.get('/img/:nome', (req, res) => {
        const nameImage = req.params.nome;
        const img = findImg(nameImage);

        if (img) {
            const pathImg = path.join(__dirname, 'img', img.arquivo);
            res.download(pathImg, (err) => {
                if (err) {
                    res.status(500).send('Erro interno no servidor, erro ao baixar a imagem');
                }
            });
        } else {
            res.status(404).send({ message: 'Imagem não encontrada' });
        }
    });
}

module.exports = requestImg;
