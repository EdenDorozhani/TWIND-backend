const Model = require("../model/Model");
const Post = require("../model/Post");
const User = require("../model/User");
const helpers = require("./helpers/helpers");

exports.getAllPosts = async (req, res) => {
  helpers.getData({
    data: req.query,
    res,
    dataMethod: new Model().getPostsData,
    countMethod: new Post().getCount,
    module: "Posts",
    latestRecordMethod: new Post(),
    key: "postId",
  });
};

exports.getAllUsers = async (req, res) => {
  helpers.getData({
    data: req.query,
    res,
    dataMethod: new User().getAllUsers,
    countMethod: new User().getUsersCount,
    module: "Followers",
  });
};
