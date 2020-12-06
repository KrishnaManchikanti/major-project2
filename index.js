const express = require('express');
const port = 8001;
const app = express();

const expresslayouts=require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//connect mongo need an extra argument, the express-session to store the cookie
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expresslayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./assets'));
//mongostore is used to store the session cookie in the db as the cookie expire when restart happens
app.use(session({
    name:'major-project2',
    //TODO need to change key before deployment
    secret:'blahsomething',//the secret key which is used for encryption
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    },(err)=>{
        console.log(err || 'mongostore is connected, yoo');
    })
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