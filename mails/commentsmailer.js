const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    console.log('inside Comment');

    nodeMailer.transporter.sendMail({
        from:"finalproject5500@gmail.com",
        to:comment.user.email,
        subject:'newCommentadded',
        html: "<b>Hello world?</b>"
    },(err,info)=>{
        if(err){console.log(`err in sending mail${err}`);return;}
        console.log(`message sent${info}`,info);
    });
}