const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    hash_password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

userSchema.virtual("password").set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 10);
})

userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password);
}
}
module.exports = mongoose.model("User", userSchema);