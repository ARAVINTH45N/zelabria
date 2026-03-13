const Internship = require("../models/Internship");

// GET internships
const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (error) {
    console.error("Error fetching internships:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getInternships,
};