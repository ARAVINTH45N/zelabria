const axios = require("axios");
const Internship = require("../models/Internship");

async function scrapeInternships() {
  try {

    console.log("Running internship scraper...");

    const response = await axios.get("https://remoteok.com/api");

    const jobs = response.data;

    for (let i = 1; i < jobs.length; i++) {

      const job = jobs[i];

      const title = job.position;
      const company = job.company;
      const location = job.location || "Remote";
      const link = "https://remoteok.com" + job.url;

      if (!title || !company) continue;

      const exists = await Internship.findOne({
        title,
        company
      });

      if (!exists) {

        await Internship.create({
          title,
          company,
          location,
          link
        });

        console.log("Saved:", title);

      }

    }

    console.log("Scraping completed");

  } catch (error) {

    console.error("Scraper error:", error.message);

  }
}

module.exports = scrapeInternships;