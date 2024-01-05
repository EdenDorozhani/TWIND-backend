const express = require("express");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const profileController = require("../controller/profile");
const {
  editProfileValidationSchema,
  changePasswordValidationSchema,
  changeEmailValidationSchema,
} = require("./validation");

router.get(
  "/getProfilePostsData",
  isAuth,
  profileController.getProfilePostsData
);

router.get("/getProfileUserData", isAuth, profileController.getProfileUserData);

router.post(
  "/editProfile",
  isAuth,
  editProfileValidationSchema,
  profileController.editProfile
);

router.post(
  "/changePassword",
  isAuth,
  changePasswordValidationSchema,
  profileController.changePassword
);

router.post(
  "/changeEmail",
  isAuth,
  changeEmailValidationSchema,
  profileController.changeEmail
);

module.exports = router;
