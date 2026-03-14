const User = require("../models/User");
const Internship = require("../models/Internship");

const findMatches = async (req, res) => {

  try {

    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const skills = user.skills || [];

    const internships = await Internship.find();

    const matches = internships.filter(job => {

      const title = job.title.toLowerCase();

      return skills.some(skill =>
        title.includes(skill.toLowerCase())
      );

    });

    res.json({
      userSkills: skills,
      matches
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Matching error"
    });

  }

};

module.exports = { findMatches };