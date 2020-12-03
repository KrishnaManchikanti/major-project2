const express = require('express');
const port = 8002;
const app = express();

const expresslayouts=require('express-ejs-layouts');
app.use(expresslayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./assets'));

app.listen(port,(err)=>{
    if(err){
        console.log(`err running server,${err}`);
    }
    console.log(`server is up at ${port}`);
});