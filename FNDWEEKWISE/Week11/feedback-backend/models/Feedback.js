const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  rating: Number,
  comments: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
