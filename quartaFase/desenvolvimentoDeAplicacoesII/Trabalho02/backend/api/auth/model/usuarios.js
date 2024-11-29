const { DataTypes } = require('sequelize');
const camposComuns = require('../../utils/models/camposComuns');

module.exports = (sequelize) => {
    const atributos = {
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
    };

    const opcoes = {
        tableName: 'usuarios',
        timestamps: true,
        defaultScope: {
            attributes: { exclude: ['senha'] },
        },
        scopes: {
            senha: { attributes: {} },
        },
    };

    return sequelize.define('Usuarios', atributos, opcoes);
};
