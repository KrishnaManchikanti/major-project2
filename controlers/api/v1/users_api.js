const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
//create session
module.exports.signin = async (req,res)=>{
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message:"Invalid username/passpord"
            });
        }
        return res.status(200).json({
            message: 'ur in, keep ur token safe',
            data:{
                token: jwt.sign(user.toJSON(), 'codeial',{expiresIn:'100000'})
            }
        });
    }catch(err){
        console.log(`error ${err}`);
        return res.status(500).json({
            message: 'Internal error',
        });
    };
};