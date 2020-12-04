const { model } = require("../../MAJOR-PROJECT1/models/Schema");
const User = require("../models/user");

const signUp = require('../models/user');

module.exports.home=(req,res)=>{
    console.log(req.cookies);
    res.render('home');
    return;
};

module.exports.home2=(req,res)=>{
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,(err,user)=>{
            if(user){
              return  res.render('ur_in',{
                    username:user.name,
                    password:user.password,
                    email:user.email
                });
            }
            res.render('temp');
        });
    }else{
        res.render('temp');
        return;
    }
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
// we will check the username and pass is crct and we create cokkie and add details into cokkie and send it to browser,server,db
module.exports.signin = (req,res)=>{
    console.log(req.body);
    signUp.findOne({
        email:req.body.email
    },(err,user)=>{
        if(err){
            console.log(`err in username/password ${err}`);
            return;
        }
        console.log(user);
        if(user){
            if(user.password != req.body.password){
                console.log('pas incrt');
                return res.redirect('back');
            }
            //handling the session cookie
            res.cookie('user_id',user.id);
            res.render('ur_in',{
                username:user.name,
                password:user.password,
                email:user.email
            });
        }else{
            console.log('email not found');
            return res.redirect('back');
        }
    });
};

module.exports.signout = (req,res)=>{
     res.clearCookie("user_id");
     return res.render('temp');
};