const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {

    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Profile fetch error"
    });

  }
};

module.exports = { getUserProfile };