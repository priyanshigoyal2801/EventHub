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
  dateFrom: { type: String, required: true },
  dateTill: { type: String, required: true },
  venue: { type: String, required: true },
  timeFrom: { type: String, required: true },
  timeTill: { type: String, required: true },
  registrationformlink: { type: String, required: true },
  feedbackformlink: { type: String, required: true },
  pocNumber: { type: String, required: true },
  approval: { type: String, required: true, default: "Pending" },
  logo: { type: Buffer, required: true },
  socials: { type: Object, required: true },
  description: { type: String, required: true },
  proposal: { type: Buffer, required: true }
});

module.exports = mongoose.model("table", tableSchema);
