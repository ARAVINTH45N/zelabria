const User = require("../models/User");

const updateSkills = async (req, res) => {
  try {

    const { userId, skills } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { skills },
      { new: true }
    );

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: "Error updating skills"
    });

  }
};

module.exports = { updateSkills };