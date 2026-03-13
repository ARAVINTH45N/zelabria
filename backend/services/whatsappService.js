const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendWhatsAppAlert = async (phone, internship) => {

    try{

        await client.messages.create({

            from: "whatsapp:+14155238886",
            to: `whatsapp:${phone}`,

            body: `
🚀 New Internship Match

Role: ${internship.title}
Company: ${internship.company}
Location: ${internship.location}

Apply here:
${internship.applyLink}
            `
        });

        console.log("WhatsApp sent to",phone);

    }catch(error){

        console.log("WhatsApp error:",error.message);

    }

};

module.exports = sendWhatsAppAlert;