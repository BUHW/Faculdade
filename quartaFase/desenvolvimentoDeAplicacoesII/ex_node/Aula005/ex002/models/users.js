const mongoose = require("mongoose");
const conn = require('../utils/database_mongodb');

conn();

const { Schema } = mongoose;

const usersSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    pass: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Users = mongoose.model('Users', usersSchema);

module.exports = {
    Users
}