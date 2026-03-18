const User = require("../models/User");
const Internship = require("../models/Internship");

const sendEmail = require("../services/emailService");
const sendWhatsapp = require("../services/whatsappService");

exports.findMatches = async (req, res) => {

  try {

    const { userId } = req.params;

    console.log("Matching request for user:", userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const userSkills = user.skills || [];

    console.log("User skills:", userSkills);

    const internships = await Internship.find();

    const matches = internships.filter(job =>
      job.skills.some(skill =>
        userSkills.includes(skill)
      )
    );

    console.log("Matches found:", matches.length);

    if (matches.length > 0) {

      const subject = "ZELABRIA Internship Match Found";

      const message = `
Hello ${user.name},

We found ${matches.length} internships matching your skills.

Matched skills:
${userSkills.join(", ")}

Login to ZELABRIA dashboard to view them.

Regards,
ZELABRIA
`;

      console.log("Attempting email to:", user.email);

      await sendEmail(user.email, subject, message);

      if (user.phone) {

        console.log("Attempting WhatsApp to:", user.phone);

        await sendWhatsapp(
          user.phone,
          `ZELABRIA: ${matches.length} internships match your skills. Check your dashboard.`
        );

      }

    }

    res.json({
      userSkills,
      matches
    });

  } catch (error) {

    console.error("Matching controller error:", error);

    res.status(500).json({
      message: "Matching failed"
    });

  }

};