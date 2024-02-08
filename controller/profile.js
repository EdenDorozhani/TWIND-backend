const Post = require("../model/Post");
const Response = require("../model/Response");
const User = require("../model/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Follower = require("../model/Follower");
const Model = require("../model/Model");
const helpers = require("./helpers/helpers");

exports.getProfilePostsData = async (req, res) => {
  const profileUserDataResponse = await new User().getOne(
    "username",
    req.query.identifier
  );
  const countIdentifier = profileUserDataResponse[0][0]?.userId;

  if (!countIdentifier) {
    let response = new Response(false, "Not found");
    return res.status(500).send(response);
  }

  helpers.getData({
    data: { ...req.query, countIdentifier, field: "posts.creatorId" },
    res,
    countMethod: new Post().getCount,
    dataMethod: new Model().getPostsData,
    latestRecordMethod: new Post(),
    key: "postId",
    module: "ProfilePosts",
  });
};

exports.getProfileUserData = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  const { username } = req.query;
  try {
    const response = await new User().getOne("username", username);
    const userId = response[0][0]?.userId;
    if (!userId) {
      throw new Error("Not found");
    }
    const profileUserDataResponse = await new User().getUserData(
      username,
      userId,
      userLoggedIn
    );
    const profileUserData = profileUserDataResponse[0][0];
    res.json(new Response(true, "", profileUserData));
  } catch (err) {
    let response = new Response(false, err.message, err);
    res.status(500).send(response);
  }
};

exports.editProfile = async (req, res) => {
  helpers.updateData({
    imageKey: "userImgURL",
    primaryKey: "userId",
    type: "user",
    classObj: new User(),
    req,
    res,
  });
};

exports.changePasswordFromProfile = async (req, res) => {
  const userId = req.userLoggedIn;
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
  const errors = validationResult(req);
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

exports.deleteAccount = async (req, res) => {
  helpers.deleteImages({
    field: "userId",
    imageField: "userImgURL",
    model: new User(),
    identifier: req.query.identifier,
    res,
  });
  helpers.deleteData({ model: new User(), type: "account", req, res });
};

exports.postFollower = async (req, res) => {
  const createdAt = new Date().toISOString();
  const { followerId, followingId, keyWord } = req.body;
  if (keyWord === "follow") {
    try {
      const dataToInsert = new Follower().formatFormData({
        ...req.body,
        createdAt,
      });
      await new Follower().addData(dataToInsert);
      res.json(new Response(true));
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const record = await new Follower().getRecord(
        followerId,
        followingId,
        "followerId"
      );
      const recordId = record[0][0].followId;
      await new Follower().deleteData(recordId);
      res.json(new Response(true));
    } catch (err) {
      console.log(err);
    }
  }
};

exports.getFollowers = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  helpers.getData({
    data: { ...req.query, userLoggedIn },
    res,
    dataMethod: new Follower().getUserFollowers,
    countMethod: new Follower().getUserFollowersCount,
    module: "Followers",
  });
};
