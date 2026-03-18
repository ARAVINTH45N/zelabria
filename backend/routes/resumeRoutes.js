const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

// controller (make sure path is correct)
const { uploadResume } = require("../controllers/resumeController");

// POST route for uploading resume
router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;