const nodemailer = require("nodemailer");
const { convert } = require("html-to-text");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(options) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "920f351a842b97", // generated ethereal user
      pass: "bc487196f71ad5", // generated ethereal password
    },
  });

  const mailOptions = {
    from: "nabeel.asif362@gmail.com", // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    html: options.message, // html body
  };

  try {
    // send mail with defined transport object
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendEmail;
