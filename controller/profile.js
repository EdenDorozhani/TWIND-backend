const Post = require("../model/Post");
const Profile = require("../model/Profile");
const Response = require("../model/Response");
const User = require("../model/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.getProfilePostsData = async (req, res) => {
  const { identifier, pageSize, page } = req.query;
  const offset = page * pageSize - pageSize;
  try {
    const profilePostsResponse = await new Profile().getProfilePostsData(
      identifier,
      pageSize,
      offset
    );
    const profilePosts = profilePostsResponse[0];
    const profileUserDataResponse = await new User().findUserByUsername(
      identifier
    );
    const profileUserData = profileUserDataResponse[0][0];
    const postsCount = await new Post().getCount(
      profileUserData.userId,
      "posts.creatorId"
    );
    const count = postsCount[0][0]["COUNT(*)"];
    res.json(
      new Response(true, "data fetched successfully", {
        data: profilePosts,
        count,
      })
    );
  } catch (err) {
    console.log(err);
  }
};

exports.getProfileUserData = async (req, res) => {
  const { username } = req.query;
  try {
    const profileUserDataResponse = await new User().findUserByUsername(
      username
    );
    const profileUserData = profileUserDataResponse[0][0];
    res.json(new Response(true, "", profileUserData));
  } catch (err) {
    console.log(err);
  }
};

exports.editProfile = async (req, res) => {
  const userLoggedIn = req.body.userId;
  const userImgURL = req.files?.userImgURL?.[0].path;
  const errors = validationResult(req);
  const image = userImgURL ? userImgURL : req.body.userImgURL;
  const obj = { ...req.body, userImgURL: image };
  try {
    if (!errors.isEmpty()) {
      throw new Error("cannot create account");
    }
    await new User().updateData(obj, userLoggedIn);
    res.json(new Response(true, "user profile has updated successfully", obj));
  } catch (err) {
    let response = new Response(false, err.message, errors.array());
    res.status(500).send(response);
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.body.userId;
  const { newPassword } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new Error("cannot change password");
    }
    const password = await bcrypt.hash(newPassword, 12);
    await new User().updateData({ password }, userId);
    res.json(new Response(true, "password changed successfully"));
  } catch (err) {
    let response = new Response(false, err.message, errors.array());
    res.status(500).send(response);
  }
};

exports.changeEmail = async (req, res) => {
  const userId = req.body.userId;
  const { newEmail } = req.body;
  console.log(errors.array());
  try {
    if (!errors.isEmpty()) {
      throw new Error("cannot change email");
    }
    await new User().updateData({ email: newEmail }, userId);
    res.json(new Response(true, "email changed successfully"));
  } catch (err) {
    let response = new Response(false, err.message, errors.array());
    res.status(500).send(response);
  }
};
