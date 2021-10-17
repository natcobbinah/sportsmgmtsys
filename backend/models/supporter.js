const mongoose = require("mongoose");
const { Schema } = mongoose;

const SupporterSchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  tickets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

module.exports = mongoose.model("Supporter", SupporterSchema);
