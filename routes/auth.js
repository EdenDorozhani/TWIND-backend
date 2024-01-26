const express = require("express");

const authController = require("../controller/auth");

const {
  signupValidationSchema,
  loginValidationSchema,
  configureEmailValidationSchema,
} = require("./validation");

const router = express.Router();

router.post("/signup", signupValidationSchema, authController.signup);

router.post("/login", loginValidationSchema, authController.login);

router.post(
  "/configureEmail",
  configureEmailValidationSchema,
  authController.configureEmail
);

router.post("/changePassword", authController.changePassword);

module.exports = router;
