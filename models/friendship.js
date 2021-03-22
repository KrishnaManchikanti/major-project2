const mongoose = require('mongoose');
const friendshipSchema = mongoose.Schema({
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const Friendship = mongoose.model('Frienship',friendshipSchema);
module.exports =Friendship;
