const mongoose = require('mongoose');
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
    }
}, {
    timestamps: true
});
// telling mongoose that it is model
const User = mongoose.model('User',userSchema);
//exporting our usermodel
module.exports = User;