const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully to Atlas.");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB Atlas:", error);
  });

const tableSchema = mongoose.Schema({
  eventName: { type: String, required: true },
  orgName: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  time: { type: String, required: true },
  registrationformlink: { type: String, required: true },
  feedbackformlink: { type: String, required: true },
  pocNumber: { type: Number, required: true },
});

module.exports = mongoose.model("table", userSchema);
