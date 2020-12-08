const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = (req,res)=>{
    console.log(req.body);
    //post is the name of the field
    Post.findById(req.body.post,(err,post)=>{
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            },(err,comment)=>{
                if(err){
                    console.log(`err in creating comment${err}`);
                    return res.redirect('back');
                }
                post.comments.push(comment);
                post.save();//while updating
                console.log(`comment created succesfully${comment}`);
                return res.redirect('back');
            });
        }
    });
    
    
};
