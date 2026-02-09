
const { DataTypes } = require('sequelize');

const camposComuns = {
    cancelado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
};

module.exports = camposComuns;
