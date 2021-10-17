const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlayerSchema = new Schema({
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
  city: {
    type: String,
  },
  licenseNotes: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  educationStatus: {
    type: String,
    required: true,
  },
  mothersName: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  position: {
    type: String,
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

module.exports = mongoose.model("Player", PlayerSchema);
