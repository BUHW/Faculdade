
const { DataTypes } = require('sequelize');

const camposComuns = {
    cancelado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
};

module.exports = camposComuns;
