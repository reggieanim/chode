var nodemailer = require("nodemailer");
var config = require("../config");
var transporter = nodemailer.createTransport(config.mailer);

exports.sendMail = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  var content = `name: ${name} \n email: ${email} \n message: ${message} `;

  var mailOptions = {
    from: "Chode <no-reply@reggieanim@gmail.com>",
    to: "animreggie@gmail.com",
    subject: "You got a new message ",
    text: content
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
      res.json("could not send email")
      return
    }
    res.json("thank you for contacting us");
  });
};
