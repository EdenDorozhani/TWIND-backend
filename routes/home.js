const express = require("express");

const homeController = require("../controller/home");

const { managePostValidationSchema } = require("./validation");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/getUserLoggedInData", isAuth, homeController.getUserData);

router.get("/getPosts", isAuth, homeController.getPosts);

router.get("/getSinglePost", isAuth, homeController.getSinglePost);

router.post(
  "/create",
  isAuth,
  managePostValidationSchema,
  homeController.createPost
);

router.post(
  "/editPost",
  isAuth,
  managePostValidationSchema,
  homeController.updatePost
);

router.delete("/deletePost", isAuth, homeController.deletePost);

module.exports = router;
