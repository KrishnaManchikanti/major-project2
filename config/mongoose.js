const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MJ2_development', { useNewUrlParser: true,useUnifiedTopology: true });

const db =  mongoose.connection;

db.on('error', console.error.bind(console,"err in connecting db"));

db.once('open',()=>{
    console.log('success connecting db');
});

module.exports = db;