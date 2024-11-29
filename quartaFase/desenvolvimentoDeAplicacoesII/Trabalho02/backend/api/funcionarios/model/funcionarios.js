const { DataTypes, Model } = require('sequelize');
const camposComuns = require('../../utils/models/camposComuns');

module.exports = model

function model(sequelize){
    const atributos = {
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
                key: 'id_especialidade',
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
                key: 'i_setor',
            },
            onDelete: 'SET NULL',
        },
        ...camposComuns
    }

    const opcoes = {
        tableName: 'funcionarios',
        timestamps: false,
    };

    return sequelize.define('Funcionarios', atributos, opcoes);
}