const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Response = require("../model/Response");

exports.signup = async (req, res) => {
  const userImgURL = "images/Default_pfp.svg.png";
  const formData = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new Error("cannot create account");
    }
    const password = await bcrypt.hash(formData.password, 12);
    const dataToInsert = new User().formatFormData({
      ...formData,
      password,
      userImgURL,
    });
    const response = await new User().addData(dataToInsert);
    const responseData = { userId: response[0].insertId };
    res.json(
      new Response(
        true,
        "your account has been successfully created",
        responseData
      )
    );
  } catch (err) {
    let response = new Response(false, err.message, errors.array());
    res.status(500).send(response);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const resolve = await new User().getOne("username", username);
    if (resolve[0].length === 0) {
      throw new Error("Authentication failure: Invalid username or password");
    }
    const userData = resolve[0][0];
    const token = jwt.sign(
      { username, userId: userData.userId },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    const doMatch = await bcrypt.compare(password, userData.password);
    const responseData = { token, userData };
    if (!doMatch) {
      throw new Error("Authentication failure: Invalid username or password");
    }
    res.json(new Response(true, "Logged in successfully", responseData));
  } catch (err) {
    let response = new Response(false, err.message);
    res.status(500).send(response);
  }
};

exports.forgotPassword = async (req, res) => {
  const { newPassword, email } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new Error("cannot change password");
    }
    const response = await new User().getOne("users.email", email);
    const userId = response[0][0].userId;
    const password = await bcrypt.hash(newPassword, 12);
    await new User().updateData({ password }, userId);
    res.json(new Response(true, "password changed successfully"));
  } catch (err) {
    let response = new Response(false, err.message, errors.array());
    res.status(500).send(response);
  }
};
