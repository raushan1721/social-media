const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hash_token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
});
tokenSchema.virtual("token").set(function (token) {
    this.hash_token = bcrypt.hashSync(token, 10);
});
tokenSchema.methods = {
    authenticate: function (token) {
        return bcrypt.compareSync(token, this.hash_token);
}
}
module.exports = mongoose.model("Token", tokenSchema);