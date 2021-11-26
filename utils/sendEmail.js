const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      host: process.env.HOST,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text:
        "Your verification code: " +
        text +
        "\nIf you don`t get what is going on, please just ignore this message!",
    });
    console.log(text);
    console.log("email sent sucessfully", email);
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
