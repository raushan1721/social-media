const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post: {
        type: String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    description: {
        type: String,
        required:true
    },
    parentId: {
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model("comment", commentSchema);