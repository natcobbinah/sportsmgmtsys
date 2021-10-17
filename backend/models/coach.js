const mongoose = require("mongoose");
const { Schema } = mongoose;

const CoachSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  street: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["male", "female", "bi-sexual", "transgender"],
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  educationStatus: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Teams",
  },
});

module.exports = mongoose.model("Coach", CoachSchema);
