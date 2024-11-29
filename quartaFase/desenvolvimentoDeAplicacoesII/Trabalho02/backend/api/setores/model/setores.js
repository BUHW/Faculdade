const { DataTypes, Model } = require('sequelize');
const camposComuns = require('../../utils/models/camposComuns');

module.exports = model

function model(sequelize){
    const atributos = {
        id: {
            field: 'i_setor',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ...camposComuns
    }

    const opcoes = {
        tableName: 'setores',
        timestamps: false,
    };

    return sequelize.define('Setores', atributos, opcoes);
}