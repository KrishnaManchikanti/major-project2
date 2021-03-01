const nodeMailer = require("../config/nodemailer");
const User = require('../models/user');
module.exports.resetPassword = async function(accessToken){

    let htmlString = await nodeMailer.renderTemplate({accessToken:accessToken} , "/reset_password/reset_password.ejs");
    console.log(accessToken);
    let user =await User.findById(accessToken.user);
    console.log(user);
    nodeMailer.transporter.sendMail({
        from: 'mkrishna2355@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: "Codeial : Reset Password", // Subject line
        html: htmlString // html body

      } , function(error , info){
          if(error){console.log("Error in sending mail",error);return;}
          console.log("Message Sent" , info);
          return;
      });
}