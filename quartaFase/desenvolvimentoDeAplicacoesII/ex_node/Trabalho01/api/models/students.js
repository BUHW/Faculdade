const mongoose = require("mongoose");
const conn = require('../utils/db');

conn();

const { Schema } = mongoose;

const studentsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
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