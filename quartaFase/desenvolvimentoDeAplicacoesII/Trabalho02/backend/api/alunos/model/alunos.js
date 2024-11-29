const { DataTypes } = require('sequelize');
const camposComuns = require('../../utils/models/camposComuns');

module.exports = (sequelize) => {
    const atributos = {
        id: {
            field: 'i_aluno',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        sobrenome: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        dataNascimento: {
            field: 'data_nascimento',
            type: DataTypes.DATE,
            allowNull: false,
        },
        matricula: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        genero: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        responsavelId: {
            field: 'i_responsavel',
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'responsaveis',
                key: 'i_responsavel',
            },
            onDelete: 'SET NULL',
        },
        diagnostico: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ...camposComuns,
    };

    const opcoes = {
        tableName: 'alunos',
        timestamps: true,
    };

    return sequelize.define('Alunos', atributos, opcoes);
};
