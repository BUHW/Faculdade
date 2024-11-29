const { DataTypes, Model } = require('sequelize');
const camposComuns = require('../../utils/models/camposComuns');

module.exports = model

function model(sequelize){
    const atributos = {
        id: {
            field: 'i_agendamento',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        alunos: {
            field: 'i_aluno',
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'alunos',
                key: 'i_aluno',
            },
            onDelete: 'CASCADE',
        },
        funcionarios: {
            field: 'i_funcionario',
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'funcionarios',
                key: 'i_funcionario',
            },
            onDelete: 'SET NULL',
        },
        dataAgendamento: {
            field: 'data_agendamento',
            type: DataTypes.DATE,
            allowNull: false,
        },
        horaInicio: {
            field: 'hora_inicio',
            type: DataTypes.TIMESTAMP,
            allowNull: false,
        },
        horaFim: {
            field: 'hora_fim',
            type: DataTypes.TIMESTAMP,
            allowNull: false,
        },
        tipoAtendimento: {
            field: 'tipo_atendimento',
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        justificativaAusencia: {
            field: 'justificativa_ausencia',
            type: DataTypes.TEXT,
            allowNull: false,
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        ...camposComuns
    }

    const opcoes = {
        tableName: 'agendamentos',
        timestamps: false,
    };

    return sequelize.define('Agendamentos', atributos, opcoes);
}