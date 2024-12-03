const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    participantes: {
      type: String,
      required: true,
    },
    cancelado: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", eventsSchema);

module.exports = {
  Events,
};
