const { DataTypes } = require('sequelize');
const sequelize = require('./database_postgre');

conn();

const { Schema } = mongoose;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    user: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
}, {
    tableName: 'usuarios',
    timestamps: true,
});

module.exports = {Users}