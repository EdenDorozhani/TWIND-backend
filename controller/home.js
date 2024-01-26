const { validationResult } = require("express-validator");
const Post = require("../model/Post");
const Response = require("../model/Response");
const User = require("../model/User");
const fs = require("fs");

const helpers = require("./helpers");

exports.getUserData = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  const response = await new User().getOne("userId", userLoggedIn);
  const userData = response[0][0];
  res.json(new Response(true, "user data is fetched", userData));
};

exports.getFollowingPostsData = async (req, res) => {
  helpers.getData({
    data: req.query,
    res,
    countMethod: new Post().getFollowingPostsCount,
    dataMethod: new Post().getFollowingPostsData,
    module: "Posts",
  });
};

exports.createPost = async (req, res) => {
  const caption = req.body.caption;
  const location = req.body.location;
  const postImage = req.files.postImage[0].path;
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
  const prefixToRemove = "http://localhost:3131/";
  const { postId } = req.query;
  const file = req.files?.postImage?.[0].path;
  const imageUrl = req.body.postImage;
  let url;
  if (!!imageUrl && imageUrl.startsWith(prefixToRemove)) {
    url = imageUrl.substring(prefixToRemove.length);
  } else {
    url = imageUrl;
  }
  const image = file ? file : url;
  const errors = validationResult(req);
  const obj = { ...req.body, postImage: image };
  try {
    if (!errors.isEmpty()) {
      throw new Error("cannot update post");
    }
    await new Post().updateData(obj, postId);
    res.json(
      new Response(
        true,
        `post with id:${postId} has been updated successfully`,
        obj
      )
    );
  } catch (err) {
    let response = new Response(false, err.message, errors.array());
    res.status(500).send(response);
  }
};

exports.deletePost = async (req, res) => {
  console.log(req.body);

  // fs.unlink(directoryPath + fileName, (err) => {
  //   if (err) {
  //     throw err;
  //   }

  //   console.log("Delete File successfully.");
  // });

  helpers.deleteData({ model: new Post(), type: "post", req, res });
};

exports.getSinglePost = async (req, res) => {
  const { postId, userId } = req.query;
  try {
    const response = await new Post().getSinglePost(postId, userId);
    const data = response[0][0];
    if (data.postId === null) {
      throw new Error("Post is not found");
    }
    res.json(new Response(true, "data is fetched successfully", data));
  } catch (err) {
    res.status(500).json(new Response(false, err.message));
  }
};

exports.getNotifications = async (req, res) => {
  const { page, pageSize, identifier } = req.query;
  const offset = page * pageSize - pageSize;
  try {
    const postLikes = await new User().getPostLikesNotifications(
      identifier,
      pageSize,
      offset
    );
    const postLikesCount = await new User().getPostsLikesNotificationsCount(
      identifier
    );

    const comments = await new User().getCommentsNotifications(
      identifier,
      pageSize,
      offset
    );
    const commentsCount = await new User().getCommentsNotificationsCount(
      identifier
    );

    const commentLikes = await new User().getCommentsLikesNotifications(
      identifier,
      pageSize,
      offset
    );
    const commentLikesCount =
      await new User().getCommentLikesNotificationsCount(identifier);

    const followers = await new User().getFollowingNotifications(
      identifier,
      offset
    );

    const notificationsCount =
      postLikesCount[0][0].postsLikesCount +
      commentsCount[0][0].commentsCount +
      commentLikesCount[0][0].commentLikesCount;

    const modifiedCount = notificationsCount
      ? notificationsCount + 1
      : notificationsCount;

    const notificationsData = postLikes[0].concat(
      comments[0],
      commentLikes[0],
      followers[0]
    );

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
