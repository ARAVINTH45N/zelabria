const express = require("express");
const router = express.Router();

const { updateSkills } = require("../controllers/userController");

router.post("/skills", updateSkills);

module.exports = router;