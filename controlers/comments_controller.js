const Comment = require('../models/comment');
const Post = require('../models/post');

//using asyn await
module.exports.create = async (req,res)=>{
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            });
            post.comments.push(comment);
            post.save();//while updating
            req.flash('success','comment posted succesfully');
            console.log(`comment created succesfully${comment}`);
        }
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        console.log('Error async',err);
    }
};

//using asyn await
module.exports.destroy =async (req,res)=>{

    try{
        let comment= await Comment.findById(req.params.id);
        let post = await Post.findById(comment.post);
        if(comment.user == req.user.id || post.user == req.user.id){
            var postid= comment.post;
            Comment.remove();
            //updating post by removing commentsid
            await Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}});
            req.flash('success','comment removed');
            return res.redirect('back');
        }else{ 
            req.flash('error','not a valid user');
            console.log('not a valid user'); return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        console.log('Error async',err);
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