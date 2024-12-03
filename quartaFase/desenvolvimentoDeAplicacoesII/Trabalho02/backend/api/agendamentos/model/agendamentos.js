const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/database/database_postgre');
const camposComuns = require('../../utils/models/camposComuns');

const Agendamentos = sequelize.define('Agendamentos', {
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
            type: DataTypes.TIME,
            allowNull: false,
        },
        horaFim: {
            field: 'hora_fim',
            type: DataTypes.TIME,
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
            allowNull: true,
        },
        ...camposComuns,
    }, {
        tableName: 'agendamentos',
        timestamps: true,
    });

    module.exports = Agendamentos;
