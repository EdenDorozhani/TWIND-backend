const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Response = require("../model/Response");
const fs = require("node:fs");

exports.signup = async (req, res) => {
  const userImgURL = "defaultImg/Default_pfp.svg.png";
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
    console.log(err);
    let response = new Response(false, err.message);
    res.status(500).send(response);
  }
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new Error("email is incorrect");
    }
    const token = jwt.sign({ email }, "somesupersecretsecret", {
      expiresIn: "320s",
    });
    fs.writeFile(
      "resetPsw.log",
      `localhost:3000/resetPassword?token=${token}&email=${email}`,
      () => {}
    );

    res.json(
      new Response(
        true,
        "We sent an email to eden@gmail.com with a link to reset your password."
      )
    );
  } catch (err) {
    let response = new Response(false, err.message, errors.array());
    res.status(500).send(response);
  }
};

exports.changePassword = async (req, res) => {
  const { newPassword, token, email } = req.body;
  if (!token || !email)
    return res.status(500).send(new Response(false, "No token or email", {}));

  try {
    const validToken = jwt.verify(token, "somesupersecretsecret");

    if (validToken) {
      const response = await new User().getOne("users.email", email);
      const userId = response[0][0].userId;

      const password = await bcrypt.hash(newPassword, 12);

      await new User().updateData({ password }, userId);
      res.json(new Response(true, "password changed successfully"));
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(
      new Response(false, err.name, [
        {
          ...err,
          path: "changePassword",
          msg: "Link has either expired or is not correct",
        },
      ])
    );
  }
};
