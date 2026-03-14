const cron = require("node-cron");
const scrapeInternships = require("./internshipScraper");

function startScraper() {

  // Run immediately when server starts
  scrapeInternships();

  // Run every hour
  cron.schedule("0 * * * *", () => {
    console.log("Running scheduled scraper...");
    scrapeInternships();
  });

}

module.exports = startScraper;