const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "aravinth.vnagarajan@gmail.com",
        pass: "wjch gyst nipf auoa"
    }
});


const sendInternshipAlert = async (email, internship) => {

    const mailOptions = {
        from: "aravinth.vnagarajan@gmail.com",
        to: email,
        subject: "New Internship Match Found 🚀",
        text: `
Hello,

A new internship matches your skills!

Role: ${internship.title}
Company: ${internship.company}
Location: ${internship.location}
Stipend: ${internship.stipend}

Apply here:
${internship.applyLink}

Good luck!

- ZELABRIA Internship Alerts
`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendInternshipAlert;