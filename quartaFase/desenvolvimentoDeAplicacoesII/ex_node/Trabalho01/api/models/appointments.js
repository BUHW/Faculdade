const mongoose = require("mongoose");
const conn = require("../utils/db");
const { Students } = require("./students")
const { Professionals } = require("./professionals")

conn();

const { Schema } = mongoose;

const appointmentsSchema = new Schema(
  {
    specialty: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: Students,
      required: true,
    },
    professional: {
      type: Schema.Types.ObjectId,
      ref: Professionals,
      required: true,
    },
  },
  { timestamps: true }
);

const Appointments = mongoose.model("Appointments", appointmentsSchema);

module.exports = {
    Appointments,
};
