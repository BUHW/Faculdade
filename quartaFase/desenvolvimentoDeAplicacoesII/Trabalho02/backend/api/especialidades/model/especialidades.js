const { DataTypes } = require('sequelize');
const camposComuns = require('../../utils/models/camposComuns');

module.exports = (sequelize) => {
    const atributos = {
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
    };

    const opcoes = {
        tableName: 'especialidades',
        timestamps: true,
    };

    return sequelize.define('Especialidades', atributos, opcoes);
};
