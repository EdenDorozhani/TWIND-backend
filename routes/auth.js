const express = require("express");

const authController = require("../controller/auth");

const {
  signupValidationSchema,
  loginValidationSchema,
  newPasswordValidationSchema,
} = require("./validation");

const router = express.Router();

router.post("/signup", signupValidationSchema, authController.signup);

router.post("/login", loginValidationSchema, authController.login);

router.post(
  "/forgotPassword",
  newPasswordValidationSchema,
  authController.forgotPassword
);

module.exports = router;
