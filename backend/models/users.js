const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
      console.log("MongoDB connected successfully to Atlas.");
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB Atlas:", error);
    });

const userSchema= mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'Society',
  },
})

module.exports= mongoose.model('user', userSchema);