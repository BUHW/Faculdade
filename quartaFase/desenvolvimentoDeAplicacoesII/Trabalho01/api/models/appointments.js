const mongoose = require("mongoose");

const { Schema } = mongoose;

const appointmentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    phone_number: {
      type: String,
      required: true
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
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Appointments = mongoose.model("Appointments", appointmentsSchema);

module.exports = {
    Appointments,
};
