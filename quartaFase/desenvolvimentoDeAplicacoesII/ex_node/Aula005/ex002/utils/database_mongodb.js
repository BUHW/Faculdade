const mongoose = require("mongoose");

const db = {
    host: process.env.DBMON_HOST,
    user: process.env.DBMON_USER,
    pass: process.env.DBMON_PASS,
};

async function main() {

    try {
        await mongoose.connect(`${db.host}://${db.user}:${db.pass}@cluster0.7hjr3ko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('Conexão com o MongoDB realizada com sucesso!');

    } catch (error) {
        console.log(`Erro na conexão do mongoose: ${error}`);
    }

}

module.exports = main;