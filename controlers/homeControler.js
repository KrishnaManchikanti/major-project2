const { model } = require("../../MAJOR-PROJECT1/models/Schema");
const User = require("../models/user");

const signUp = require('../models/user');

module.exports.home=(req,res)=>{
    console.log(req.cookies);
    res.render('home');
    return;
};

module.exports.home2=(req,res)=>{
    res.render('temp');
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
                return res.redirect('/home2');
                // return res.render('temp');
            });
        }else{
            console.log('email already used');
            res.redirect('back');
        }
    });
};

