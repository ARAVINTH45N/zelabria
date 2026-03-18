const User = require("../models/User");
const Internship = require("../models/Internship");

const sendEmail = require("./emailService");
const sendWhatsapp = require("./whatsappService");

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

        const subject = "ZELABRIA Internship Matches Found";

        const message = `
Hello ${user.name},

We found ${matches.length} internships matching your skills.

Matched internships:
${matches.map(m => `${m.title} at ${m.company}`).join("\n")}

Login to your dashboard to apply.

Regards,
ZELABRIA Internship Alerts
`;

        /* SEND EMAIL */

        try {

          await sendEmail(user.email, subject, message);

          console.log("Email sent to:", user.email);

        } catch (emailError) {

          console.error("Email sending failed:", emailError);

        }

        /* SEND WHATSAPP */

        try {

          if (user.phone) {

            await sendWhatsapp(
              user.phone,
              `ZELABRIA ALERT: ${matches.length} internships match your skills. Login to check.`
            );

            console.log("WhatsApp sent to:", user.phone);

          }

        } catch (whatsappError) {

          console.error("WhatsApp sending failed:", whatsappError);

        }

      }

    }

  } catch (error) {

    console.error("Matching service error:", error);

  }

};

module.exports = { checkMatchesForAllUsers };