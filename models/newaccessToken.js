const mongoose = require('mongoose');

let accessTokenSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    token:{
        type:String,
        required:true
    },
    isvalid:{
        type:Boolean
    }
},{
    timestamps:true
});

let AccessToken = mongoose.model('Accesstoken',accessTokenSchema);
module.exports= AccessToken;