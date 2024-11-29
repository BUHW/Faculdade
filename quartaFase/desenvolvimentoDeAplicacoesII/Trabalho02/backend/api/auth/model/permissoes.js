const { DataTypes } = require('sequelize');
const camposComuns = require('../../utils/models/camposComuns');

module.exports = (sequelize) => {
    const atributos = {
        id: { 
            field: 'i_permissao', 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true 
        },
        nome: { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        grupo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ...camposComuns,
    };

    const opcoes = {
        tableName: 'permissoes',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['i_permissao', 'nome'],
            } 
        ],
    };

    return sequelize.define('Permissoes', atributos, opcoes);
};
