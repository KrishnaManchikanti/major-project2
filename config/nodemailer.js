const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path= require('path');
const { realpath } = require('fs');
let transporter =  nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port:'587',
    secure: false,
    auth:{
        user:'finalproject5500@gmail.com',
        pass:'@Sthanui98',
    }
});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mails',relativePath),
        data,
        (err,Template)=>{
            if(err){console.log(`err in rendering template${err}`);return};
            mailHTML=Template;
        }
    );   
    return mailHTML;
}


module.exports ={
    transporter:transporter,
    renderTemplate:renderTemplate
};