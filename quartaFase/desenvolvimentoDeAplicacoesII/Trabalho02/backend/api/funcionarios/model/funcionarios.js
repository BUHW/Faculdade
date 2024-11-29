const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/database/database_postgre');
const camposComuns = require('../../utils/models/camposComuns');

const Funcionarios = sequelize.define('Funcionarios', {
        id: {
            field: 'i_funcionario',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        especialidades: {
            field: 'i_especialidade',
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'especialidades',
                key: 'i_especialidade',
            },
            onDelete: 'SET NULL',
        },
        disponibilidade: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        tipoFuncionario: {
            field: 'tipo_funcionario',
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        setores: {
            field: 'i_setor',
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'setores',
                key: 'i_setor'
            },
            onDelete: 'SET NULL',
        },
        ...camposComuns,
    }, {
        tableName: 'funcionarios',
        timestamps: true,
    });

    module.exports = Funcionarios;
