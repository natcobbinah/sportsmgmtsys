const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  commentBy: {
    type: Schema.Types.ObjectId,
    ref: "Supporter",
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
