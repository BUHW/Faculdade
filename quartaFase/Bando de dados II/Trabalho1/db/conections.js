const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.USER_DB,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASS_DB,
    port: process.env.PORT
});

async function conn() {
    await pool.connect(( err, client, release ) => {
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