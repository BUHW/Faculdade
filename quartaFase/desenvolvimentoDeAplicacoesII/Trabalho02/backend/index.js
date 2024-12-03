const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const config = require('./config.json')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const sequelize = require('./utils/database_postgres');

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

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do trabalho de DAW',
      version: '1.0.0',
      description: 'Documentação da API'
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
      },
    ],
  },
  apis: ['./api/router/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const url = '/api';
const routes = require('./api/index');
app.use(url + '/daw', routes);

(async () => {
  try {
      await sequelize.sync({ alter: true });
      console.log('Banco de dados sincronizado com sucesso!');
      
      app.listen(config.PORT, () => {
          console.log(`Servidor rodando na porta ${config.PORT}`);
      });
  } catch (error) {
      console.error('Erro ao sincronizar o banco de dados:', error);
  }
})();