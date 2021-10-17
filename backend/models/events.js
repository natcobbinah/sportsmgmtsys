const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: "league",
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("event", eventSchema);
