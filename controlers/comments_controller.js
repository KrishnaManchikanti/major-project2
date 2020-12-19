const Comment = require('../models/comment');
const Post = require('../models/post');

//using asyn await

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            if (req.xhr){
                // Similar for comments to fetch the user's id!
                comment = await comment.populate('user', 'email').execPopulate();
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}

//using asyn await
module.exports.destroy =async (req,res)=>{

    try{
        let comment= await Comment.findById(req.params.id);
        
        Post.findById(comment.post,(err,post)=>{
        if(comment.user == req.user.id || post.user == req.user.id){
            let postid= comment.post;
            comment.remove();
            //updating post by removing commentsid
            let post = Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}});
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "comment deleted"
                });
            }
            req.flash('success','comment deleted!');
            return res.redirect('back');
        }else{ 
            req.flash('error','not a valid user');
            console.log('not a valid user'); return res.redirect('back');
        }
    });
    }catch(err){
        req.flash('error',err);
        return console.log('Error async',err);
    }
};



// module.exports.create = (req,res)=>{
//     console.log(req.body);
//     //post is the name of the field
//     Post.findById(req.body.post,(err,post)=>{
//         if(post){
//             Comment.create({
//                 content:req.body.content,
//                 user:req.user._id,
//                 post:req.body.post
//             },(err,comment)=>{
//                 if(err){
//                     console.log(`err in creating comment${err}`);
//                     return res.redirect('back');
//                 }
//                 post.comments.push(comment);
//                 post.save();//while updating
//                 console.log(`comment created succesfully${comment}`);
//                 return res.redirect('back');
//             });
//         }
//     });
// };



       //for my reference
        //Comment.findById(req.params.id,(err,comment)=>{
        // Post.findById(comment.post,(err,post)=>{
        //     console.log(post.user ,req.user.id);
        //     if(comment.user == req.user.id || post.user == req.user.id){
        //         let postid= comment.post;
        //         Comment.remove();
        //         //updating post by removing commentsid
        //         Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},(err,post)=>{
        //             return res.redirect('back');
        //         });
        //         // comment.deleteOne({user:req.params.id},(err)=>{
        //         //     res.redirect('back');
        //         //     return;
        //         // })lol, jst use this
                
        //     }else{
        //          console.log('not a valid user');
        //          return res.redirect('back');
        //         
        //     }
        // })
        
    // });
    
// };