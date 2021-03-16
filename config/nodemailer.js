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
        pass:"@Finalyear5500",
    }
});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderTemplate(
        path.join(__dirname,'../views/mailers',relativePath),
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