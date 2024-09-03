const mongoose = require("mongoose");
const conn = require('../utils/db');

conn();

const { Schema } = mongoose;

const professionalsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    specialty: {
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

const Professionals = mongoose.model('Professionals', professionalsSchema);

module.exports = {
    Professionals
}