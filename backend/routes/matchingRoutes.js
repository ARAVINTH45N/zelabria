const express = require("express");

const router = express.Router();

const { findMatches } = require("../controllers/matchingController");

router.get("/:userId", findMatches);

module.exports = router;