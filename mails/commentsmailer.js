const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    console.log('inside Comment');
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    // console.log(htmlString,'hey');
    nodeMailer.transporter.sendMail({
        from:"finalproject5500@gmail.com",
        to:comment.user.email,
        subject:'newCommentadded',
        html: htmlString
    },(err,info)=>{
        if(err){console.log(`err in sending mail${err}`,err);return;}
        console.log(`message sent${info}`,info);
    });
}