const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/database/database_postgre');
const camposComuns = require('../../utils/models/camposComuns');

const Permissoes = sequelize.define('Permissoes', {
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
    }, {
        tableName: 'permissoes',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['i_permissao', 'nome'],
            } 
        ],
    });

    module.exports = Permissoes;
