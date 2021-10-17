const mongoose = require("mongoose");
const { Schema } = mongoose;

const TicketSchema = new Schema({
  ticketNo: {
    type: Number,
    required: true,
    unique: true,
  },
  ticketType: {
    type: String,
    enum: ["Regular", "VIP", "VVIP"],
    required: true,
  },
  ticketCost: {
    type: Number,
    required: true,
  },
  ticketStatus: {
    type: String,
    enum: ["Sold", "Available"],
  },
  ticketExpiryDate: {
    type: Date,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  boughtBy: {
    type: Schema.Types.ObjectId,
    ref: "Supporter",
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
