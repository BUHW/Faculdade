const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('banco', 'usuario', 'senha', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;