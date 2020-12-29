const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');
//use new passport-strategie 
passport.use(new googleStrategy({
    clientID: "109599224978-ir97usev2rgk0g319coass5nk8fn53ml.apps.googleusercontent.com",
    clientSecret:"ypLQs4JmB-75mGkC2afJ_joE",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
    (accessToken, refreshToken, profile, done)=>{
        //finduser
        User.findOne({email: profile.emails[0].value}).exec(
            (err,user)=>{
                if(err){console.log(` err in google outh-passport ${err}`);return;}
                console.log(profile);
                if(user){
                    //signin user
                    return done(null, user);
                }else{
                    //create and signin
                    User.create({
                        name:profile.displayName,
                        email:profile.email,
                        passport:crypto.randomBytes(20).toString('hex')
                    },(err,user)=>{
                        if(err){console.log(` err  ${err}`);return;}
                        return done(null,user);
                    });
                }
            }
        )
    }
));