const User = require("../models/User");
const bcrypt = require("bcryptjs");

/*
REGISTER USER
*/
exports.register = async (req, res) => {

  try {

    const { name, email, password, phone } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      skills: []
    });

    await user.save();

    res.json({
      message: "Registration successful",
      userId: user._id
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });

  }

};


/*
LOGIN USER
*/
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Login failed"
    });

  }

};