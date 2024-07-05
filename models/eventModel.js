// models/Event.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const eventSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    }, // Unique ID for each event
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    time: { type: String, required: true },
    rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Event", eventSchema);
