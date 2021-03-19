const mongoose = require('mongoose');
const multer = require('multer');
const path =require('path');
const AVATAR_PATH= path.join('/uploads/users/avatar');
//Schema wt we needed
const userSchema = new mongoose.Schema({
    //fields
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    name :{
        type: String,
        required: true
    },
    avatar:{
        type:String
    },
    friendship:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Friendship'
    }]
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now());
    }
});

//static methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;

// telling mongoose that it is model
const User = mongoose.model('User',userSchema);
//exporting our usermodel
module.exports = User;