const { model } = require("../../MAJOR-PROJECT1/models/Schema");
const User = require("../models/user");

const signUp = require('../models/user');

module.exports.SignUpPage=(req,res)=>{
    console.log(req.cookies);
    res.render('sign_up');
    return;
};

module.exports.SignInPage=(req,res)=>{
    res.render('sign_in');
    return;
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
                // return res.render('temp');
            });
        }else{
            console.log('email already used');
            res.redirect('back');
        }
    });
};
//create session
module.exports.signin = (req,res)=>{
    return res.render('user_profile_page');
    // return res.redirect('/');
};