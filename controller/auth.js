const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Response = require("../model/Response");
const fs = require("node:fs");
const Token = require("../model/Token");

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

    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);

    let resetToken = crypto.randomBytes(32).toString("hex");
    const bcryptToken = await bcrypt.hash(
      resetToken + tokenExpiration.getTime(),
      12
    );

    const modifiedBcryptedToken = bcryptToken + tokenExpiration.getTime();

    const response = await new User().getOne("users.email", email);
    const userId = response[0][0].userId;

    const dataToSave = {
      userId,
      token: modifiedBcryptedToken,
      expireTime: tokenExpiration,
    };

    await new Token().addData(dataToSave);

    fs.writeFile(
      "resetPsw.log",
      `localhost:3000/resetPassword?token=${modifiedBcryptedToken}`,
      () => {}
    );

    res.json(
      new Response(
        true,
        `We sent an email to ${email} with a link to reset your password`
      )
    );
  } catch (err) {
    let response = new Response(false, err.message, errors.array());
    res.status(500).send(response);
  }
};

exports.changePassword = async (req, res) => {
  const { newPassword, token } = req.body;
  const dateNow = Date.now();

  if (!token) {
    return res.status(500).send(new Response(false, "No token or email", {}));
  }

  try {
    const response = await new Token().getOne("token.token", token);

    const availableToken = response[0][0]?.token;
    const expireTime = response[0][0]?.expireTime;
    const expireTimeObject = new Date(expireTime);
    const expireTimeInMiliseconds = expireTimeObject.getTime();
    const userId = response[0][0]?.userId;
    const tokenId = response[0][0]?.tokenId;

    if (!availableToken) {
      throw new Error("The link you used to arrive at this page is not valid");
    } else if (dateNow > expireTimeInMiliseconds) {
      throw new Error("The link you used to arrive at this page has expired");
    }

    const password = await bcrypt.hash(newPassword, 12);

    await new User().updateData({ password }, userId);

    await new Token().deleteData(tokenId);

    res.json(new Response(true, "password changed successfully"));
  } catch (err) {
    return res.status(500).send(
      new Response(false, err.name, [
        {
          ...err,
          path: "changePassword",
          msg: err.message,
        },
      ])
    );
  }
};
