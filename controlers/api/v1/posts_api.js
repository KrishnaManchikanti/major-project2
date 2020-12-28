const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req, res){

    let posts= await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path:'comments',
                populate:{
                    path:'user'
                }
            });
            console.log(posts);
    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
};


module.exports.destroy = async (req,res)=>{
    try{
        let post =await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            
            
            return res.status(200).json({
                message:"post associated comments deleted"
            });
        }else{
            return res.status(401).json({
                message:"You can't delete!!!!!"
            });
        }
    }catch(err){
       
        return res.status(500).json({
            message:'internal server error'
        });
    }
};

