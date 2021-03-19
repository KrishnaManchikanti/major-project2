
module.exports.addfriend = async (req,res)=>{
    try {
        return res.status(200).json({
            message:'Request Successfull',
            data:{
                friends: req.query
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'Internal Server Error'
        });
    }
}