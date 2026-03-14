const cron = require("node-cron");

const scrapeInternships = require("./internshipScraper");
const { checkMatchesForAllUsers } = require("../services/matchingService");

const startScraper = () => {

  console.log("Running internship scraper...");

  // Run immediately when server starts
  runScraper();

  // Run every 6 hours
  cron.schedule("0 */6 * * *", async () => {

    console.log("Scheduled scraper running...");

    await runScraper();

  });

};

const runScraper = async () => {

  try {

    console.log("Starting internship scraping...");

    await scrapeInternships();

    console.log("Scraping completed");

    console.log("Running matching engine...");

    await checkMatchesForAllUsers();

    console.log("Matching completed");

  } catch (error) {

    console.error("Scraper error:", error.message);

  }

};

module.exports = startScraper;