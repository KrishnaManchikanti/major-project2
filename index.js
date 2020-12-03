const express = require('express');
const port = 8001;
const app = express();

const expresslayouts=require('express-ejs-layouts');
app.use(expresslayouts);
const db = require('./config/mongoose');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./assets'));
// killall -9 node
app.listen(port,(err)=>{
    if(err){
        console.log(`err running server,${err}`);
    }
    console.log(`server is up at ${port}`);
});