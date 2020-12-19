const Posts = require('../models/post');
const User = require('../models/user');
const comments = require('../models/comment');
module.exports.home = async (req,res)=>{
    // Using async await for clear code
    try{
        let posts= await Posts.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path:'comments',
                populate:{
                    path:'user'
                }
            });
        let users = await User.find({});
        return res.render('home',{
            posts:posts,
            comments:'hello',
            all_users:users
        });
    }catch(err){
        console.log('Error',err);
    }
};
    // Posts.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'user'
    //     }
    // })
    // .exec( (err,posts)=>{
    //     if(err){
    //         console.log(`err in finding posts${err}`);
    //         return;
    //     }
    //     User.find({},(err,users)=>{
    //         return res.render('home',{
    //             posts:posts,
    //             comments:'hello',
    //             all_users:users
    //         }); 
    //     })
    // });
// };

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


