
const { createComment, updateComment, deleteComment, getComment } = require("../controllers/comment");
const { isUserSignin } = require("../middleware");

const router = require("express").Router();

router.post("/comment/", isUserSignin, createComment);
router.put("/comment/:comment_id/", isUserSignin, updateComment);
router.delete("/comment/:comment_id/", isUserSignin, deleteComment);
router.get("/comment/:post_id/", isUserSignin, getComment);


module.exports = router;