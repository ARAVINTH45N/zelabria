const User = require("../models/User");

exports.updateSkills = async (req, res) => {

  try {

    const { userId, skills } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { skills: skills },
      { new: true }
    );

    res.json({
      message: "Skills updated",
      user
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error updating skills"
    });

  }

};