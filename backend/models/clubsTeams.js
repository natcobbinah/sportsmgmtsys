const mongoose = require("mongoose");
const { Schema } = mongoose;

const clubTeamsSchema = new Schema({
  clubName: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  clubCoach: [
    {
      type: Schema.Types.ObjectId,
      ref: "Coach",
    },
  ],
  clubManager: {
    type: String,
    required: false,
  },
  clubSponsors: [
    {
      sponsorName: String,
    },
  ],
  clubBadge: {
    type: Schema.Types.ObjectId,
    required: false,
    /* data: Buffer,
    contentType: String, */
  },
});

module.exports = mongoose.model("clubTeam", clubTeamsSchema);
