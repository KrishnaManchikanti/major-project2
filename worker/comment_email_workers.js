const queue = require('../config/kue');

const commentsMailer = require('../mails/commentsmailer');

 queue.process('emails',(job,done)=>{
    console.log('email workers',job.data);
    commentsMailer.newComment(job.data);
    done();
});