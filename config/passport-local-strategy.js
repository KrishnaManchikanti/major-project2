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
            console.log('Valid user- ur in',user);
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

//check the user is authenticated 
passport.checkAuthentication = (req, res, next)=>{
    //if the user is authenticated then pass on the next fun(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if not send back to signin page
    return res.redirect('/users/signin');
};

passport.setAuthenticateduser = (req, res , next)=>{
    if(req.isAuthenticated()){
        // req.user contains curr authiticated user we r sending into locals for views
        // we have created a variable called user in locals so,that u can use in ejs:)
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
