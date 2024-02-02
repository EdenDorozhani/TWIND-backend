const express = require("express");

const authController = require("../controller/auth");

const {
  signupValidationSchema,
  loginValidationSchema,
  resetPasswordValidationSchema,
} = require("./validation");

const router = express.Router();

router.post("/signup", signupValidationSchema, authController.signup);

router.post("/login", loginValidationSchema, authController.login);

router.post(
  "/resetPassword",
  resetPasswordValidationSchema,
  authController.resetPassword
);

router.post("/changePassword", authController.changePassword);

module.exports = router;
