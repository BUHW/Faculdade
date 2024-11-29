const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventsSchema = new Schema(
  {
    description: {
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
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", eventsSchema);

module.exports = {
  Events,
};
