const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// load .env file from root folder
dotenv.config({ path: path.join(__dirname, "../.env") });

const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const matchingRoutes = require("./routes/matchingRoutes");
const startScraper = require("./scrapers/scheduler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/match", matchingRoutes);

app.get("/", (req, res) => {
  res.send("ZELABRIA Internship API running");
});

const PORT = process.env.PORT || 5000;

// Debug check
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");

    startScraper();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });