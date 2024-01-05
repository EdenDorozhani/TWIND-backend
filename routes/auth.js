const express = require("express");

const authController = require("../controller/auth");

const {
  signupValidationSchema,
  loginValidationSchema,
} = require("./validation");

const router = express.Router();

router.post("/signup", signupValidationSchema, authController.signup);

router.post("/login", loginValidationSchema, authController.login);

module.exports = router;
