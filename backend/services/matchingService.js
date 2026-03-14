const User = require("../models/User");
const Internship = require("../models/Internship");

const checkMatchesForAllUsers = async () => {

  try {

    const users = await User.find();
    const internships = await Internship.find();

    for (const user of users) {

      const skills = user.skills || [];

      const matches = internships.filter(job => {

        const title = job.title.toLowerCase();

        return skills.some(skill =>
          title.includes(skill.toLowerCase())
        );

      });

      if (matches.length > 0) {

        console.log(`Matches found for ${user.email}`);

        matches.forEach(job => {

          console.log(
            `Match → ${job.title} at ${job.company}`
          );

        });

      }

    }

  } catch (error) {

    console.error("Matching service error:", error);

  }

};

module.exports = { checkMatchesForAllUsers };