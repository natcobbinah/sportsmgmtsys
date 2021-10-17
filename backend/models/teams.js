const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeamsSchema = new Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamOwner: {
    type: String,
    required: true,
  },
  yearEstablished: {
    type: String,
    required: true,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  coaches: [
    {
      type: Schema.Types.ObjectId,
      ref: "Coach",
    },
  ],
});

module.exports = mongoose.model("Teams", TeamsSchema);
