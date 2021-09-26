const { check, validateResult, validationResult } = require("express-validator");

exports.validateSignupRequest = [
    check("username").notEmpty().withMessage("username is required"),
    check("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid email"),
    check("password").notEmpty().withMessage("password is required").isLength({ min: 6 }).withMessage("password should be contain atleast 6 character")
]

exports.authRequestValidated = (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(403).json({ message: errors.array()[0].msg });
    next();
}

exports.validateSigninRequest = [
    check("username").notEmpty().withMessage("valid username is required"),
    check("password").notEmpty().withMessage("password is required").isLength({ min: 6 }).withMessage("password should be contain atleast 6 character")
]
