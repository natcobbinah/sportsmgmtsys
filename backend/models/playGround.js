const mongoose = require("mongoose");
const { Schema } = mongoose;

const playGroundSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  fixtures: {
    type: Schema.Types.ObjectId,
    ref: "Fixtures",
  },
});

module.exports = mongoose.model("playGround", playGroundSchema);
