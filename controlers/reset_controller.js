const User = require('../models/user');
const resetPasswordmailer = require('../mails/reset_passwordmailer');
const AccessToken = require('../models/newaccessToken');
const crypto = require('crypto');
module.exports.details = (req,res)=>{
    return res.render('email_details.ejs');
}

module.exports.verify = async (req,res)=>{
    let user = await User.findOne({email : req.body.email});
    if(user){
        let token = await crypto.randomBytes(20).toString("hex");
        let accessToken = await AccessToken.create({
           user : user,
           token : token,
           isvalid:true
        });
        resetPasswordmailer.resetPassword(accessToken);
        return res.end('check mail bro');
    }else{
        req.flash("error", "Account does not exist with this email");
        return res.redirect('back');
    }
}


module.exports.resetPassword = async (req,res)=>{
    console.log(req.query.accessToken);
    let accessToken = await AccessToken.findOne({token:req.query.accessToken});
    console.log(accessToken,"accessTokencheck");
    if(accessToken){
        if(accessToken.isvalid){
            return res.render('verifyp',{
                accessToken:req.query.accessToken
            });
        }
    }
    req.flash('error' , 'Token is Expired ! Pls regenerate it.');
     return res.redirect('/reset');
}

module.exports.newP = async function(request , response){
    console.log( request.query);
   
    let accessToken = await AccessToken.findOne({token : request.query.accessToken});
    console.log(accessToken ,'AccessToken');
    if(accessToken){
        console.log('AccessToken Present',accessToken.isvalid  )
        if(accessToken.isvalid){
            console.log('AccessToken is valid' )
            accessToken.isvalid = false;
            console.log(request.body.password,request.body.confirm_password);
            if(request.body.password == request.body.confirm_password){
                console.log('Password  matchedd' )
                let user = await User.findById(accessToken.user);
                if(user){
                    console.log('User found' , user )
                    user.password = request.body.password;
                    accessToken.save();
                    user.save();
                    console.log('Password changed' , user )
                    request.flash('success' , 'Password Changed');
                    return response.redirect('/users/signin');
                }
            }else{
                request.flash('error' , 'Password didnt matched');
                return response.redirect('back');
            }


        }
    }

    request.flash('error' , 'Token is Expired ! Pls regenerate it.');
    return response.redirect('/reset');
} 