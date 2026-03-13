const express = require("express");
const router = express.Router();
const matchingController = require("../controllers/matchingController");

router.get("/user/:userId", matchingController.matchInternships);

module.exports = router;