const { Passport } = require('passport');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email'
    },(email, password, done)=>{
        //finding user and establishing identity
        User.findOne(
            {email:email}
        ,(err,user)=>{
            if(err){
                console.log(`err in finding user - passport`);
                return done(err);
            }
            if(!user || user.password!=password){
                console.log(`Invalid user/password`);
                return done(null,false);
            }
            console.log('Valid user- ur in');
            return done(null, user);
        });
    }
));

//serlizing the user to decide which key used to be kept in cookies 
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

//deserlizating the user from the key in cookies, when it send to db

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            console.log(`err in finding user - passport`);
            return done(err);
        }
        return done(null,user);
    });
});

module.exports = passport;
