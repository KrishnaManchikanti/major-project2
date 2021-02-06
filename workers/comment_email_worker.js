const queue = require('../config/kue');
 
const commentMailer = require('../mailers/comments_mailer');

queue.process('emails',(job,done)=>{
    console.log('email work doing',job.data);
    commentMailer.newComment(job.data);
    done(); 
});