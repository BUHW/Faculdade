const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/database/database_postgre');
const camposComuns = require('../../utils/models/camposComuns');

const Setores = sequelize.define('Setores', {
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
        ...camposComuns,
    }, {
        tableName: 'setores',
        timestamps: true,
    });

    module.exports = Setores
