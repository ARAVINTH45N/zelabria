const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  company: {
    type: String,
    required: true
  },

  location: {
    type: String
  },

  link: {
    type: String
  },

  skills: {
    type: [String],
    default: []
  }

}, { timestamps: true });

module.exports = mongoose.model("Internship", InternshipSchema);