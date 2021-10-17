const mongoose = require("mongoose");
const { Schema } = mongoose;

const FixturesSchema = new Schema({
  teamOne: {
    type: String,
    required: false,
  },
  teamTwo: {
    type: String,
    required: false,
  },
  scores: {
    type: String,
  },
  playatTimeDate: {
    type: Date,
    required: false,
  },
  postPoned: {
    type: Boolean,
    required: false,
  },
  playGround: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  winner: {
    type: String,
    required: false,
  },
  looser: {
    type: String,
    required: false,
  },
  draw: {
    type: String,
    required: false,
  },
  fouls: [
    {
      foulType: String,
    },
  ],
});

module.exports = mongoose.model("Fixtures", FixturesSchema);
