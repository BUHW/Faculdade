const mongoose = require("mongoose");
const { Students } = require("./students")
const { Professionals } = require("./professionals")

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
      type: String,
    },
    professional: {
      type: String,
    },
  },
  { timestamps: true }
);

const Appointments = mongoose.model("Appointments", appointmentsSchema);

module.exports = {
    Appointments,
};
