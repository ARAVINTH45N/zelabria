const Internship = require("../models/Internship");
const extractSkills = require("../utils/skillExtractor");

async function scrapeInternships() {

  console.log("Running internship scraper...");

  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Netflix",
    "Tesla",
    "Adobe",
    "Oracle",
    "IBM",
    "Intel"
  ];

  const roles = [
    "Frontend Developer Intern",
    "Backend Developer Intern",
    "Full Stack Developer Intern",
    "React Developer Intern",
    "Node.js Developer Intern",
    "Python Developer Intern",
    "Java Developer Intern",
    "Software Engineer Intern"
  ];

  const locations = [
    "Remote",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune"
  ];

  for (let company of companies) {

    for (let role of roles) {

      const skills = extractSkills(role);

      const existing = await Internship.findOne({
        title: role,
        company: company
      });

      if (!existing) {

        const internship = new Internship({
          title: role,
          company: company,
          location: locations[Math.floor(Math.random()*locations.length)],
          link: "https://careers.example.com",
          skills: skills
        });

        await internship.save();

        console.log("Added:", role, "-", company);

      }

    }

  }

}

module.exports = scrapeInternships;