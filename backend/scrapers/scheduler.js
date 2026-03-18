const cron = require("node-cron");

const scrapeInternships = require("./internshipScraper");
const { checkMatchesForAllUsers } = require("../services/matchingService");

function startScraper() {

  console.log("Scheduler started...");

  /* RUN ON SERVER START */

  scrapeInternships();
  checkMatchesForAllUsers();

  /* RUN EVERY 1 MINUTE (FOR TESTING) */

  cron.schedule("0 */6 * * *", async () => {

    console.log("Running scheduled tasks...");

    try {

      await scrapeInternships();

      await checkMatchesForAllUsers();

      console.log("Scheduler cycle completed");

    } catch (error) {

      console.error("Scheduler error:", error);

    }

  });

}

module.exports = startScraper;