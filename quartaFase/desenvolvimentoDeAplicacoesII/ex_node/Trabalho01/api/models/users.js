const mongoose = require("mongoose");
const conn = require('../utils/db');

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
}, { timestamps: true });

const Users = mongoose.model('Users', usersSchema);

module.exports = {
    Users
}