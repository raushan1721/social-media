const User = require("../model/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/email");
const Token = require("../model/token");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
exports.signup = async (req, res) => {
  await User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) return res.status(400).json({ message: "user already exist" });
    const { username, email, password } = req.body;
    let _user = new User({
      username,
      email,
      password,
    });
    _user.save((error, data) => {
      if (error)
        return res.status(400).json({ message: "something went wrong" });
      if (data) {
        return res
          .status(200)
          .json({ message: "user created successfully!!!" });
      }
    });
  });
};

exports.signin = async (req, res) => {
  await User.findOne({ username: req.body.username }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        const { email, username ,_id} = user;
        return res.status(200).json({
          token,
          user: {
            _id,
            email,
            username,
          },
        });
      } else {
        return res.status(400).json({ message: "wrong password" });
      }
    } else {
      return res.status(400).json({ message: "user not found" });
    }
  });
};

exports.signout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "signout successfully" });
};

exports.forgotpassword = async (req, res) => {
  await User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.json({ message: "something wrong" });
    if (user) {
      const { email } = req.body;
      let resettoken = crypto.randomBytes(32).toString("hex");
      const token = Token.findOne({ user: user._id });
      if (token) await token.deleteOne();
      await new Token({
        user: user._id,
        token: resettoken,
      }).save();
      const link = `https://assignment1721.netlify.app/createpassword/?token=${resettoken}&&id=${user._id}`;
      const subject = "reset password";
      const success =sendEmail(email, link, subject);
      if (!success) return res.status(200).json({ message: "email sent" });
      else {
        return res.status(500).json({ message: "something went wrong" });
      }
    }
    else {
      res.json({ message: "user not found" });
    }
  });
};

exports.createpassword = async (req, res) => {
  const { id, token } = req.query;

  await Token.findOne({ user: id }).exec(async (error, data) => {
    if (error) return res.json({ message: "something wrong" });
    if (token) {
      const isValid = data.authenticate(token);
      if (isValid) {
        const password=bcrypt.hashSync(req.body.password, 10)
        const user=await User.findByIdAndUpdate(
          {
            _id: id,
          },
          { $set: { hash_password: password } },
          { new: true }
        );
        if (user)
          
          return res.json({message:"password changed successfully!!!"})
      }
      else {
        return res.json({message:"expired link"})
      }
    }
  });
};
