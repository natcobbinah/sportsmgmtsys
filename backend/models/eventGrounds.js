const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventGroundSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "event",
  },
  groundsId: {
    type: Schema.Types.ObjectId,
    ref: "playGround",
  },
});

module.exports = mongoose.model("eventGround", eventGroundSchema);
