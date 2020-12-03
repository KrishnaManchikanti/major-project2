const { model } = require("../../MAJOR-PROJECT1/models/Schema");

module.exports.home=(req,res)=>{
    res.render('home');
    return;
};

module.exports.temp=(req,res)=>{
    res.render('temp');
    return;
};