var nodemailer = require('nodemailer');

const sendEmail = () =>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elkaoumiahmed@gmail.com',
      pass: 'kwyzkwoctspizhis'
    }
  });
  
  var mailOptions = {
    from: 'elkaoumiahmed@gmail.com',
    to: 'lailazaher2001@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = {sendEmail}