const express = require("express");
const router = express.Router();

const { getInternships } = require("../controllers/internshipController");

// GET all internships
router.get("/", getInternships);

module.exports = router;