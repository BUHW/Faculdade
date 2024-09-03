const mongoose = require("mongoose");
const conn = require('../utils/db');

conn();

const { Schema } = mongoose;

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