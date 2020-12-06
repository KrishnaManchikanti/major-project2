const express = require('express');
const port = 8001;
const app = express();

const expresslayouts=require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expresslayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./assets'));

app.use(session({
    name:'major-project2',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
//whenever user is authenticated, we will store identity to locals(index.js)
app.use(passport.setAuthenticateduser);
app.use('/',require('./routes'));

// killall -9 node
app.listen(port,(err)=>{
    if(err){
        console.log(`err running server,${err}`);
    }
    console.log(`server is up at ${port}`);
});