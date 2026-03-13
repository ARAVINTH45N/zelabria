const cron = require("node-cron");
const scrapeInternships = require("./internshipScraper");

const startScraper = () => {

    cron.schedule("*/30 * * * *", async () => {

        console.log("Running internship scraper...");

        await scrapeInternships();

    });

};

module.exports = startScraper;