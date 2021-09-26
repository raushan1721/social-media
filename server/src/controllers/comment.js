const Comment = require("../model/comment");
function getComment(comments, parentId = null) {
    let comment;
    const commentList = [];
    if (parentId == null) {
        comment = comments.filter(com => com.parentId == undefined);
    }
    else {
        comment = comments.filter(com => com.parentId == parentId);
    }
    for (let com of comment) {
        commentList.push({
            _id:com._id,
            post: com.post,
            user: com.user,
            description:com.description,
            children: getComment(comments, com._id)
        })
    }
    return commentList ;
}

exports.createComment = async (req, res) => {
    const { post, description, parentId } = req.body;
    const user = req.user._id;
    const comment = {
        post, description, user
    };
if (parentId) {
    comment.parentId = parentId;
}

const com = new Comment(comment);
com.save((error, comment) => {
    if (error) return res.status(400).json({ message: error });
    if (comment) {
        return res.status(200).json({ comment });
    }
})
}

exports.updateComment = async (req, res) => {
    const comment_id = req.params.comment_id;
    await Comment.findById(comment_id).exec(async (error, comment) => {
        if (error) return res.status(500).json({ message: "something went wrong" });
        if (comment) {
            if (comment.user == req.user._id) {

                    await comment.updateOne({ $set: req.body })
                    return res.status(200).json({ message: "your comment has been  updated successfully" });

            }
            else {
                return res.status(400).json({ message: "you can update only your comment" });
            }
        }
        else {
            return res.status(400).json({ message: "comment not found" });
        }

    })
}

exports.deleteComment = async (req, res) => {
    const commentId = req.params.comment_id;
    await Comment.findById(commentId).exec(async (error, comment) => {
        if (error)  return res.status(500).json({ message: "something went wrong" });
        if (comment) {
            if (comment.user == req.user._id) {
                await comment.deleteOne();
                return res.status(200).json({ message: "your comment has been delted" });
            }
            else {
                return res.statsu(400).json({ message: "you can delete only your comment" });
            }
        }
        return res.status(400).json({ message: "comment is not found" });
    })
}

exports.getComment = async (req, res) => {
    const postId = req.params.post_id;
    await Comment.find({ post: postId }).exec((error, comments) => {
        if (error) return res.status(500).json({ message: "something went wrong" });
        if (comments) {
            const commentList = getComment(comments);
            return res.status(200).json({commentList})
        }
    })
}