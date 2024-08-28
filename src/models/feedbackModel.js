const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  childName: { type: String, required: true },
  feedback: { type: String, required: true },
  satisfaction: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
