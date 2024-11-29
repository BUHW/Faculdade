const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database_postgre');
const camposComuns = require('../utils/models/camposComuns')

const Usuario = sequelize.define('Usuario', {
    id: {
        field: 'i_usuario',
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ...camposComuns
}, {
    tableName: 'usuarios',
    timestamps: true,
});

module.exports = {Users}