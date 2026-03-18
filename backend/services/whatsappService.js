const twilio = require("twilio");

const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

async function sendWhatsapp(phone, message) {

  try {

    const result = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:${phone}`,
      body: message
    });

    console.log("WhatsApp sent:", result.sid);

  } catch (error) {

    console.error("WhatsApp error:", error);

  }

}

module.exports = sendWhatsapp;