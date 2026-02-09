const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/database/database_postgre');
const camposComuns = require('../../utils/models/camposComuns');

const Especialidades = sequelize.define('Especialidades', {
        id: {
            field: 'i_especialidade',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            field: 'nome_especialidade',
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        ...camposComuns,
    }, {
        tableName: 'especialidades',
        timestamps: true,
    });

    module.exports = Especialidades;
