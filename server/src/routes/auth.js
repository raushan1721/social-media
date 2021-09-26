const router = require("express").Router();
const { signin,signup,forgotpassword,createpassword, signout } = require("../controllers/auth");
const { isUserSignin } = require("../middleware");
const { validateSignupRequest, authRequestValidated, validateSigninRequest } = require("../validators/auth");
router.post("/signup", validateSignupRequest,authRequestValidated,signup)

router.post("/signin", validateSigninRequest,authRequestValidated,signin)
router.post("/signout", isUserSignin, signout);
router.post("/forgotpassword", forgotpassword);

router.post("/createpassword", createpassword);

module.exports = router;