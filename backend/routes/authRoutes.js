const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


// SIGNUP
router.post("/signup", authController.signup);

// LOGIN
router.post("/login", authController.login);

// UPDATE PROFILE
router.put("/update-profile", authController.updateProfile);


module.exports = router;