const express = require("express");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const { commentValidationSchema } = require("./validation");

const postController = require("../controller/post");

router.get("/getComments", isAuth, postController.getComments);

router.get("/getReplies", isAuth, postController.getReplies);

router.get("/getPostsLikes", isAuth, postController.getPostsLikes);

router.get("/getCommentsLikes", isAuth, postController.getCommentsLikes);

router.post("/updatePostLikes", isAuth, postController.updatePostLikes);

router.post(
  "/postComment",
  isAuth,
  commentValidationSchema,
  postController.postComment
);

router.post("/updateCommentLikes", isAuth, postController.updateCommentLikes);

router.delete("/deleteComment", isAuth, postController.deleteComment);

module.exports = router;
