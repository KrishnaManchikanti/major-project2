const posts = require('../models/post');

const comments = require('../models/comment');
module.exports.home = (req,res)=>{
    // posts.find({},(err,posts)=>{
    //     if(err){
    //         console.log(`err in finding posts${err}`);
    //         return;
    //     }
    //     return res.render('home',{
    //         posts:posts
    //     });
    // });
    posts.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec( (err,posts)=>{
        if(err){
            console.log(`err in finding posts${err}`);
            return;
        }
        return res.render('home',{
            posts:posts,
            comments:'hello'
        }); 
    });
};

// module.exports.comments = (req,res)=>{
//     comments.find({}).populate('user').populate('posts').exec((err,comments)=>{
//         if(err){
//             console.log(`err in finding posts${err}`);
//             return;
//         }
//         console.log(comments);
//         return res.render('home',{
//             comments:comments
//         }); 
//     });
// };