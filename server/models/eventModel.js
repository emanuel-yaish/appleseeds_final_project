const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A account must have a passport id"],
    unique: true,
  },
  description: {
    type: String,
    default: 0,
  },
  participents: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
