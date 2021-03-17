const nodeMailer = require('../config/nodemailer');
const User = require('../models/user'); 

exports.resetPassword = async (accessToken)=>{
    console.log('inside Comment',accessToken);

    let htmlString = await nodeMailer.renderTemplate({accessToken:accessToken} , "reset_password.ejs");

    let user = await User.findById(accessToken.user);

    nodeMailer.transporter.sendMail({
        from:"finalproject5500@gmail.com",
        to: user.email,
        subject:'resetpassword',
        html: htmlString
    },(err,info)=>{
        if(err){console.log(`err in sending mail${err}`,err);return;}
        console.log(`message sent${info}`,info);
    });
}