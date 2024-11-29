const { DataTypes } = require('sequelize');
const sequelize = require('./database_postgre');

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    school_disciplines: {
        type: String,
    },
    contact: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = {
    Teacher
}