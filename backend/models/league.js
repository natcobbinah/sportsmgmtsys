const mongoose = require("mongoose");
const { Schema } = mongoose;

const leagueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  participatingClubs: [
    {
      type: Schema.Types.ObjectId,
      ref: "clubTeam",
    },
  ],
});

module.exports = mongoose.model("league", leagueSchema);
