const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (req,res)=>{
    try{
        let post = await Post.create({ content:req.body.content, user:req.user._id});
        if(req.xhr){//we return json as a status
            post = await post.populate('user', 'email').execPopulate();
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'post created'
            });
        }
        req.flash('success','post-created');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        console.log(`err ${err}`);
        return res.redirect('back');
    };
};

module.exports.destroy = async (req,res)=>{
    try{
        let post =await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'post deleted succesfully'
                });
            }
            req.flash('success','post & comments are removed');
            return res.redirect('back');
        }else{
            req.flash('error','not a valid user');
            console.log('not a valid user');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return console.log(`err ${err}`);
    }
};


// module.exports.create = (req,res)=>{
//     // console.log(`id of the user - ${req.user._id}`);
//     Post.create({
//         content:req.body.content,
//         //reference how u got user- In setAuthentication middleware we created user, so for every request can use user identity 
//         // y we are using user field and storing userid bcoz we r going populatedata with that id 
//         user:req.user._id
//     },(err,post)=>{
//         if(err){
//          console.log(`err in creating posts${err}`);
//          return res.redirect('back');
//         }
//          console.log(`successfully created post${post}`);
//          return res.redirect('back');
//     });
// };


// module.exports.destroy = (req,res)=>{
//     Post.findById(req.params.id,(err,post)=>{
//         //.id means converting objectid to string
//         if(post.user == req.user.id){
//             post.remove();
//             Comment.deleteMany({post: req.params.id},(err)=>{
//                 return res.redirect('back');
//             })
//         }else{
//             console.log('not a valid user');
//             return res.redirect('back');
//         }
//     });
// };