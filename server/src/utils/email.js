const nodemailer = require("nodemailer");

module.exports = (email, link,subject) => {
    var transporter = nodemailer.createTransport({
        service: process.env.EMAIL_HOST,
        auth: {
          user: process.env.FROM_EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from:process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html:`<p>click this link to reset your password</p><a href=${link}>click here</a>`
      };
      
       transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return false;
         }
         if (info) {
            return true;
        }
      });
 
        
}
