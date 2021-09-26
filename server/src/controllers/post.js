
const Post = require("../model/post");

exports.createPost =async (req, res) => {
    const post = new Post({
        user: req.user._id,
        description: req.body.description,
        likes: req.body.likes
    });

    if (req.file) {
        post.image = req.file.filename;
    }

    await post.save((error, post) => {
        if (error) return res.status(500).json(error)
        if (post) {
            return res.status(200).json({ message: "successfully posted" })
        }
    });

}

exports.updatePost =async (req, res) => {
    const postId = req.params.post_id;
    const userId = req.user._id;
    await Post.findOne({ _id: postId }).exec(async (error, post) => {
        if (error) return res.status(500).json({message:"something went wrong"});
        if (post) {
            if (post.user == userId) {
                if (req.file) {
                    req.body.image = req.file.filename;
                }
                await post.updateOne({ $set: req.body });
                return res.status(200).json({ message: "your post has been updated" });
            }
            else {
                return res.status(400).json({ message: "you can update only your post" });
            }
        }
        else {
            return res.status(400).json({ message: "post not found" });
        }
    })
}

exports.deletePost = async (req, res) => {
    const postId = req.params.post_id;
    const userId = req.user._id;
    await Post.findOne({ _id: postId }).exec(async (error, post) => {
        if (error) return res.status(500).json({ message: "something went wrong" });  
        if (post) {
            if (post.user == userId) {
                await post.deleteOne();
                return res.status(200).json({ message: "your post has been deleted" });

            }
            else {
                return res.status(400).json({ message: "you can delete only your post" });
            }
        }
        else {
            return res.status(400).json({ message: "post not found" });
        }
    })
}

exports.likePost = async (req, res) => {
    const postId = req.params.post_id;
    await Post.findOne({ _id: postId }).exec(async (error, post) => {
        if (error) return res.status(500).json({ message: "something went wrong" });
        if (post) {
            if (!post.likes.includes(req.user._id)) {
                await post.updateOne({ $push: { likes: req.user._id } });
                return res.status(200).json({ message: "the post has been liked" });
            }
            else {
                await post.updateOne({ $pull: { likes: req.user._id} });
                return res.status(200).json({ message: "the post has been disliked" });

            }
        }
        else {
            return res.status(400).json({ message: "post not found" });
        }
    })
}

exports.getPost =async (req, res) => {
    await Post.findById(req.params.post_id).exec((error, post) => {
        if (error) return res.status(500).json({ message: "soemthing went wrong" });
        
        if (post) {
            return res.status(200).json({ post });
        }
        else {
            return res.status(400).json({ message: "post not found" });
        }
    })

}

exports.timelinePost =async (req, res) => {
    
    await Post.find().populate("user",{username:1}).exec((error, posts) => {
        if (error) return res.status(500).json({ message: "something went wrong" });
        if (posts) {
            return res.status(200).json({ posts });
        }
        else {
            return res.status(400).json({ message: "post not found" });
        }
})
}