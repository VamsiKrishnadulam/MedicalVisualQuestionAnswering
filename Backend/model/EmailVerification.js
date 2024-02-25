// EmailVerification.js

const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  Otp: {
    type: Number,
    required: [true, "Otp is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Email", EmailSchema);
