const { DataTypes, Model } = require('sequelize');
const camposComuns = require('../../utils/models/camposComuns');

module.exports = model

function model(sequelize){
    const atributos = {
        id: {
            field: 'i_responsavel',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        contato: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        alunos: {
            field: 'i_aluno',
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'alunos',
                key: 'i_aluno',
            },
            onDelete: 'SET NULL',
        },
        relacaoAluno: {
            field: 'relacao_aluno',
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        ...camposComuns
    }

    const opcoes = {
        tableName: 'responsaveis',
        timestamps: false,
    };

    return sequelize.define('Responsaveis', atributos, opcoes);
}