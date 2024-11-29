const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/database/database_postgre');
const camposComuns = require('../../utils/models/camposComuns');

const Usuarios = sequelize.define('Usuarios', {
        id: {
            field: 'i_usuario',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        login: {
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
        defaultScope: {
            attributes: { exclude: ['senha'] },
        },
        scopes: {
            senha: { attributes: {} },
        },
    });

    module.exports = Usuarios;
