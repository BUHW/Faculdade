const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { conn } = require('./db/conections');
require('dotenv').config();

conn();

app.use(cors());

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

app.listen( process.env.PORT_SERVER || 8081, () => {
    console.log(`Servidor rodando com sucesso na porta ${ process.env.PORT_SERVER }`)
})