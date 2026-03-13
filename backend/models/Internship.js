const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({

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

    skills: {
        type: [String]
    },

    stipend: {
        type: String
    },

    applyLink: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Internship", internshipSchema);