const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const requestImg = require('./ex001');
const path = require('path');
const config = require('./config.json')

requestImg(app);

app.use(express.static('FrontEnd'));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

const url = '/api';

const users = require('./ex002/index');

app.use(url + '/dawII', users);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'FrontEnd', '404.html'));
});

app.listen(config.PORT, () => {
    console.log(`Servidor rodando na porta ${config.PORT}`);
})