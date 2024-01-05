const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Response = require("../model/Response");

exports.signup = async (req, res, next) => {
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

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  const userobj = new User();
  try {
    const resolve = await userobj.findUserByUsername(username);
    if (resolve[0].length === 0) {
      throw new Error("Authentication failure: Invalid username or password");
    }
    const user = resolve[0][0];

    const token = jwt.sign(
      { username: username, userId: user.userId },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    const doMatch = await bcrypt.compare(password, user.password);
    const responseData = { token: token, userData: user };
    if (!doMatch) {
      throw new Error("Authentication failure: Invalid username or password");
    }
    res.json(new Response(true, "Logged in successfully", responseData));
  } catch (err) {
    let response = new Response(false, err.message);
    res.status(500).send(response);
  }
};
