const { DataTypes } = require('sequelize');
const sequelize = require('./database_postgre');

const studentsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    parents: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    special_needs: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });

const Students = mongoose.model('Students', studentsSchema);

module.exports = {
    Students
}