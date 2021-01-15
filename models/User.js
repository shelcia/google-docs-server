const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 2,
    max: 512,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  document: {
    type: Array,
    required: true,
    min: 2,
    max: 512,
  },
  token: {
    type: String,
    required: true,
    min: 2,
    max: 1024,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;