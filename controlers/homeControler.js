const { model } = require("../../MAJOR-PROJECT1/models/Schema");
const User = require("../models/user");

const signUp = require('../models/user');

module.exports.home = (req,res)=>{
    return res.render('home');
};

module.exports.SignUpPage=(req,res)=>{
    console.log(req.cookies);
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }
    return res.render('sign_up');
};

module.exports.SignInPage=(req,res)=>{
    if(req.isAuthenticated()){
       return res.redirect('/profile');
    }
    return res.render('sign_in');
};

module.exports.profile=(req,res)=>{
   return res.render('user_profile_page');
};

module.exports.signup=(req,res)=>{
    console.log(req.body);
    if(req.body.password!=req.body.conformpassword){
        return res.redirect('back');
    }
    User.findOne({
        email:req.body.email
    },(err,user)=>{
        if(err){
            console.log(`err in finding user name ${err}`);
            return;
        }
        if(!user){
            signUp.create({
                // req.body- takeout the brackets when u use this
                email:req.body.email,
                password:req.body.password,
                name:req.body.name
            },(err,newSignup)=>{
                if(err){
                    console.log(`err in creating signup${err}`);
                    return;
                }
                console.log(`success in creating signup ${newSignup}`);
                return res.redirect('/signin');
            });
        }else{
            console.log('email already used');
            res.redirect('back');
        }
    });
};
//create session
module.exports.signin = (req,res)=>{
    return res.redirect('/profile');
};

module.exports.signout = (req,res)=>{
    req.logout();
    return res.redirect('/');
};