const posts = require('../models/post');


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
    posts.find({}).populate('user').exec( (err,posts)=>{
        if(err){
            console.log(`err in finding posts${err}`);
            return;
        }
        return res.render('home',{
            posts:posts
        }); 
    });
};


