const Post = require('../models/post');
const Comment = require('../models/comment');//for deleteing comments

module.exports.create = async (req,res)=>{
    try{
        await Post.create({ content:req.body.content, user:req.user._id});
        return res.redirect('back');
    }catch(err){
        console.log(`err ${err}`);
    };
};

module.exports.destroy = async (req,res)=>{
    try{
        let post =await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            console.log('not a valid user');
            return res.redirect('back');
        }
    }catch(err){
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