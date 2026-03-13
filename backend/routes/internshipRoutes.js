const express = require("express");
const router = express.Router();
const internshipController = require("../controllers/internshipController");


router.post("/create", internshipController.createInternship);

router.get("/all", internshipController.getInternships);


module.exports = router;