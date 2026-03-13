const axios = require("axios");
const cheerio = require("cheerio");
const Internship = require("../models/Internship");

async function scrapeRemoteOK() {
  try {

    console.log("Running internship scraper...");

    const url = "https://remoteok.com/remote-dev-jobs";

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(response.data);

    const jobs = [];

    $("tr.job").each((index, element) => {

      const title = $(element).find("h2").text().trim();
      const company = $(element).find(".companyLink h3").text().trim();
      const location = "Remote";

      const link =
        "https://remoteok.com" +
        $(element).attr("data-href");

      if (title && company) {
        jobs.push({
          title,
          company,
          location,
          link
        });
      }

    });

    for (const job of jobs) {

      const exists = await Internship.findOne({
        title: job.title,
        company: job.company
      });

      if (!exists) {
        await Internship.create(job);
        console.log("Saved:", job.title);
      }

    }

    console.log("Scraping completed");

  } catch (error) {
    console.error("Scraper error:", error.message);
  }
}

module.exports = scrapeRemoteOK;