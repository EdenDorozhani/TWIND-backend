const { body } = require("express-validator");
const User = require("../../model/User");
const bcrypt = require("bcryptjs");

exports.signupValidationSchema = [
  body("name").trim().notEmpty().isAlpha().isLength({ min: 2, max: 30 }),
  body("lastname").trim().notEmpty().isAlpha().isLength({ min: 2, max: 30 }),
  body("username")
    .trim()
    .notEmpty()
    .isLength({ max: 30, min: 2 })
    .matches(/^[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/)
    .custom(async (value) => {
      const user = await new User().getOne("username", value);
      if (user[0][0]) {
        throw new Error("username already in use");
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .custom(async (value) => {
      const user = await new User().getOne("email", value);
      if (user[0][0]) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  body("country").trim().isString().notEmpty(),
  body("about").isLength({ max: 250 }),
];

exports.loginValidationSchema = [
  body("username")
    .trim()
    .notEmpty()
    .matches(/^[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/),
  body("password")
    .trim()
    .notEmpty()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
];

exports.managePostValidationSchema = [
  body("postImage")
    .custom((value, { req }) => {
      const imageUrl = req.body.postImage;
      const file = req.files?.postImage?.[0];
      if (typeof imageUrl === "string") {
        return true;
      } else if (!imageUrl && !!file) {
        return true;
      } else if (req.files.postImage[0].size > 31457280) {
        return false;
      } else if (!file && !imageUrl) {
        return false;
      }
    })
    .withMessage("file should be of type image and smaller than 30 MB"),
];

exports.editProfileValidationSchema = [
  body("userImgURL")
    .custom((value, { req }) => {
      const imageUrl = req.body.userImgURL;
      const file = req.files?.userImgURL?.[0];
      if (typeof imageUrl === "string") {
        return true;
      } else if (!imageUrl && !!file) {
        return true;
      } else if (req.files.userImgURL[0].size > 31457280) {
        return false;
      } else if (!file && !imageUrl) {
        return false;
      }
    })
    .withMessage("file should be of type image and smaller than 30 MB"),
  body("name").trim().notEmpty().isString().isLength({ min: 3, max: 20 }),
  body("lastname").trim().notEmpty().isString().isLength({ min: 3, max: 20 }),
  body("username")
    .trim()
    .notEmpty()
    .matches(/^[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/)
    .custom(async (value, { req }) => {
      const response = await new User().getOne("username", value);
      const user = response[0][0];
      if (user && user.userId !== req.userLoggedIn) {
        throw new Error("username already in use");
      }
    }),
  body("country").trim().isString().notEmpty(),
  body("about").isLength({ max: 250 }),
];

exports.changePasswordValidationSchema = [
  body("currentPassword")
    .trim()
    .notEmpty()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .custom(async (value, { req }) => {
      const userId = req.userLoggedIn;
      const response = await new User().getOne("users.userId", userId);
      const userData = response[0][0];
      const doMatch = await bcrypt.compare(value, userData.password);
      if (!doMatch) {
        throw new Error("incorrect password");
      }
    }),
  body("newPassword")
    .trim()
    .notEmpty()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
];

exports.resetPasswordValidationSchema = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .custom(async (value) => {
      const response = await new User().getOne("users.email", value);
      const user = response[0][0];
      if (!user) {
        throw new Error("incorrect email");
      }
    }),
];

exports.changeEmailValidationSchema = [
  body("currentEmail")
    .trim()
    .notEmpty()
    .isEmail()
    .custom(async (value, { req }) => {
      const userId = req.userLoggedIn;
      const response = await new User().getOne("email", value);
      const user = response[0][0];
      console.log(user);
      if (!user && user?.userId !== userId) {
        throw new Error("incorrect email");
      }
    }),
  body("newEmail")
    .trim()
    .notEmpty()
    .isEmail()
    .custom(async (value) => {
      const user = await new User().getOne("email", value);
      if (user[0][0]) {
        throw new Error("E-mail already in use");
      }
    }),
];

exports.commentValidationSchema = [
  body("description")
    .notEmpty()
    .isLength({ max: 200 })
    .withMessage("Comment must be below 200 characters."),
];
