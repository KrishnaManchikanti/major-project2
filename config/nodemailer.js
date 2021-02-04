const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'mkrishna2355', // generated ethereal user
      pass: '@Google1431', // generated ethereal password
    },
});

let renderTemplate = (data, relativepath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname+'../views/mailers',relativepath),
        data,
           (err,template)=>{
            if(err){console.log(`err in renMT${err}`);return;}
            mailHTML=template;
           }
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}