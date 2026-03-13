const cron = require("node-cron");
const scrapeRemoteOK = require("./internshipScraper");

function startScraper() {

  scrapeRemoteOK();

  cron.schedule("0 * * * *", () => {
    console.log("Running scheduled scraper...");
    scrapeRemoteOK();
  });

}

module.exports = startScraper;