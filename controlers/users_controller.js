const User = require("../models/user");



module.exports.SignUpPage=(req,res)=>{
    console.log(req.cookies);
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_up');
};

module.exports.SignInPage=(req,res)=>{
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('sign_in');
};

module.exports.profile=(req,res)=>{
    User.findById(req.params.id,(err,user)=>{
        return res.render('user_profile_page',{
            profile_user:user
        });
    });
};

module.exports.update = (req,res)=>{
    //in params we have profile userid
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            email:req.body.email
            //or req.body
        },(err,user)=>{
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorised');
    }
};


module.exports.signup= async (req,res)=>{
    try{
        if(req.body.password!=req.body.conformpassword){
            return res.redirect('back');
        }
        let user = await User.findOne({email:req.body.email});
        if(!user){
            await User.create(req.body);
            req.flash('success','Your profile created');
            return res.redirect('/users/signin');
        }else{
            req.flash('error','email already used');
            console.log('email already used');
            res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        console.log(`err ${err}`);
    }
};


// module.exports.signup=(req,res)=>{
//     console.log(req.body);
//     if(req.body.password!=req.body.conformpassword){
//         return res.redirect('back');
//     }
//     User.findOne({
//         email:req.body.email
//     },(err,user)=>{
//         if(err){
//             console.log(`err in finding user name ${err}`);
//             return;
//         }
//         if(!user){
//             User.create({
//                 // req.body- takeout the brackets when u use this
//                 email:req.body.email,
//                 password:req.body.password,
//                 name:req.body.name
//             },(err,newSignup)=>{
//                 if(err){
//                     console.log(`err in creating signup${err}`);
//                     return;
//                 }
//                 console.log(`success in creating signup ${newSignup}`);
//                 return res.redirect('/users/signin');
//             });
//         }else{
//             console.log('email already used');
//             res.redirect('back');
//         }
//     });
// };


//create session
module.exports.signin = (req,res)=>{
    req.flash('success','logged-in successfully');
    return res.redirect('/');
};

module.exports.signout = (req,res)=>{
    req.logout();
    req.flash('success','logged-out successfully');
    return res.redirect('/');
};

