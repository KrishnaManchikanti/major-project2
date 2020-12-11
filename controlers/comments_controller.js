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


module.exports.destroy = (req,res)=>{
    
    Comment.findById(req.params.id,(err,comment)=>{
       
        Post.findById(comment.post,(err,post)=>{
            console.log(post.user ,req.user.id);
            if(comment.user == req.user.id || post.user == req.user.id){
                let postid= comment.post;
                Comment.remove();
                //updating post by removing commentsid
                Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},(err,post)=>{
                    return res.redirect('back');
                });
                // comment.deleteOne({user:req.params.id},(err)=>{
                //     res.redirect('back');
                //     return;
                // })lol, jst use this
                
            }else{
                console.log('not a valid user');
                res.redirect('back');
                return;
            }
        })
        
    });
    
};