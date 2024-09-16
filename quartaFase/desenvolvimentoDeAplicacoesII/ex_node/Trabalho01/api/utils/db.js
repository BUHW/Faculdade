const mongoose = require("mongoose");
const config = require('../../config.json')

async function main() {

    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(`${config.DBMON_HOST}://${config.DBMON_USER}:${config.DBMON_PASS}@cluster0.pj48vof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('Conexão com o MongoDB realizada com sucesso!');

    } catch (error) {
        console.log(`Erro na conexão do mongoose: ${error}`);
    }

}

module.exports = main;