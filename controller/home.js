const { validationResult } = require("express-validator");
const Post = require("../model/Post");
const Response = require("../model/Response");
const User = require("../model/User");

const helpers = require("./helpers/helpers");

exports.getUserData = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  try {
    const response = await new User().getOne("userId", userLoggedIn);
    const userData = response[0][0];
    res.json(new Response(true, "user data is fetched", userData));
  } catch (err) {
    let response = new Response(false, err.message);
    res.status(500).send(response);
  }
};

exports.getFollowingPostsData = async (req, res) => {
  helpers.getData({
    data: req.query,
    res,
    countMethod: new Post().getFollowingPostsCount,
    dataMethod: new Post().getFollowingPostsData,
    module: "Posts",
    latestRecordMethod: new Post(),
    key: "postId",
  });
};

exports.createPost = async (req, res) => {
  const caption = req.body.caption;
  const location = req.body.location;
  const postImage = req.files?.postImage?.[0].path;
  const createdAt = new Date().toISOString();
  const creatorId = req.userLoggedIn;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("couldn't post, maybe file is more than 30 MB");
    }
    const dataToSave = { postImage, caption, createdAt, location, creatorId };
    await new Post().addData(dataToSave);
    return res.json(new Response(true, "post has been created successfully"));
  } catch (err) {
    let response = new Response(false, err.message, errors.array());
    res.status(500).send(response);
  }
};

exports.updatePost = async (req, res) => {
  helpers.updateData({
    imageKey: "postImage",
    primaryKey: "postId",
    type: "post",
    classObj: new Post(),
    req,
    res,
  });
};

exports.deletePost = async (req, res) => {
  helpers.deleteImages({
    field: "postId",
    model: new Post(),
    identifier: req.query.identifier,
    imageField: "postImage",
    res,
  });
  helpers.deleteData({ model: new Post(), type: "post", req, res });
};

exports.getSinglePost = async (req, res) => {
  const { postId, userId } = req.query;
  try {
    const response = await new Post().getSinglePost(postId, userId);
    const data = response[0][0];
    if (!data) {
      throw new Error("Post is not found");
    }
    res.json(new Response(true, "data is fetched successfully", data));
  } catch (err) {
    console.log(err.message);
    res.status(500).json(new Response(false, err.message));
  }
};

exports.getNotifications = async (req, res) => {
  const { page, pageSize, userLoggedIn, interrupt } = req.query;
  const offset = page * pageSize - pageSize;
  try {
    const postLikes = await new User().getPostLikesNotifications(
      userLoggedIn,
      pageSize,
      +offset
    );
    const postLikesCount = await new User().getPostsLikesNotificationsCount(
      userLoggedIn
    );

    const comments = await new User().getCommentsNotifications(
      userLoggedIn,
      pageSize,
      +offset
    );
    const commentsCount = await new User().getCommentsNotificationsCount(
      userLoggedIn
    );

    const commentLikes = await new User().getCommentsLikesNotifications(
      userLoggedIn,
      pageSize,
      +offset
    );
    const commentLikesCount =
      await new User().getCommentLikesNotificationsCount(userLoggedIn);

    let followers;

    if (interrupt === "false") {
      followers = await new User().getFollowingNotifications(
        userLoggedIn,
        +offset
      );
    }

    const notificationsCount =
      postLikesCount[0][0].postsLikesCount +
      commentsCount[0][0].commentsCount +
      commentLikesCount[0][0].commentLikesCount;

    const modifiedCount =
      interrupt === "true" || followers[0].length !== 0
        ? notificationsCount + 1
        : notificationsCount;

    let notificationsData;
    if (interrupt === "true") {
      notificationsData = postLikes[0].concat(comments[0], commentLikes[0]);
    } else {
      notificationsData = postLikes[0].concat(
        comments[0],
        commentLikes[0],
        followers?.[0]
      );
    }

    const responseData = {
      data: notificationsData,
      module: "Notifications",
      count: modifiedCount,
    };

    res.json(
      new Response(true, "notifications are fetched successfully", responseData)
    );
  } catch (err) {
    console.log(err);
  }
};
