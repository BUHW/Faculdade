const express = require('express');
const app = express();
const config = require('./config.json');
const requestImg = require('./ex001');

requestImg(app);

app.listen(config.PORT, () => {
    console.log(`Servidor rodando na porta ${config.PORT}`);
})