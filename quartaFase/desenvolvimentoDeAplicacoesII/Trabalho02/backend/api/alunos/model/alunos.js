const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/database/database_postgre');
const camposComuns = require('../../utils/models/camposComuns');

const Alunos = sequelize.define('Alunos', {
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
    }, {
        tableName: 'alunos',
        timestamps: true,
    });

    module.exports = Alunos;
