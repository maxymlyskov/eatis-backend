const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

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
    //attach the plugin to the nodemailer transporter
    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".handlebars", // handlebars extension
          layoutsDir: "views", // location of handlebars templates
          defaultLayout: "index", // name of main template
        },
        viewPath: "views",
        extName: ".handlebars",
      })
    );

    transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      template: "index",
      context: {
        code: text,
      },

      // text:
      //   "Your verification code: " +
      //   text +
      //   "\nIf you don`t get what is going on, please just ignore this message!",
    });
    console.log(text);
    console.log("email sent sucessfully", email);
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
