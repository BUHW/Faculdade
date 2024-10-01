const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASS,
    port: process.env.PORT
});

function conn() {
    pool.connect(( err, client, release ) => {
        if (err) {
            return console.error('Erro ao conectar com o banco de dados', err.stack);
        }
        console.log('Conexão com o banco de dados realizada com sucesso');
        release();
    });
}

module.exports = { 
    conn
};