const { createPost, updatePost, deletePost, likePost, getPost, timelinePost } = require("../controllers/post");
const { isUserSignin } = require("../middleware");

const router = require("express").Router();

//create a post

const multer = require('multer');
const shortid=require("shortid")
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })


router.post("/post/", isUserSignin,upload.single('postImage'), createPost);
router.put("/post/:post_id/", isUserSignin, upload.single('postImage'),updatePost);
router.delete("/post/:post_id/", isUserSignin, deletePost);
router.put('/post/:post_id/like/', isUserSignin, likePost);
router.get("/post/:post_id/", isUserSignin, getPost);
router.get('/timeline/', isUserSignin, timelinePost);





module.exports = router;