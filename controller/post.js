const { validationResult } = require("express-validator");
const PostsLikes = require("../model/PostsLikes");
const Comment = require("../model/Comment");
const Response = require("../model/Response");
const CommentLikes = require("../model/CommentLikes");
const helpers = require("./helpers/helpers");

exports.updatePostLikes = async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  helpers.updateLikes(req.body, postId, userId, new PostsLikes(), res);
};

exports.updateCommentLikes = async (req, res) => {
  const userId = req.body.userId;
  const commentId = req.body.commentId;
  helpers.updateLikes(req.body, commentId, userId, new CommentLikes(), res);
};

exports.postComment = async (req, res) => {
  const createdAt = new Date().toISOString();
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new Error("cannot post comment");
    }
    const dataToInsert = new Comment().formatFormData({
      ...req.body,
      createdAt,
    });
    const addComment = await new Comment().addData(dataToInsert);
    const commentId = addComment[0].insertId;
    const responseData = await new Comment().getAddedCommentData(commentId);
    let commentData = responseData[0][0];
    if (!responseData.reply) {
      commentData = { ...commentData, totalReplies: 0 };
    }
    await res.json(
      new Response(true, "comment added successfully", commentData)
    );
  } catch (err) {
    res.status(500).send(new Response(false, err.message, errors.array()));
  }
};

exports.getComments = async (req, res) => {
  helpers.getData({
    data: req.query,
    countMethod: new Comment().getCommentsCount,
    dataMethod: new Comment().getAllComments,
    module: "Comments",
    res,
    key: "commentId",
    latestRecordMethod: new Comment(),
  });
};

exports.deleteComment = async (req, res) => {
  helpers.deleteData({ model: new Comment(), type: "comment", req, res });
};

exports.getReplies = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  helpers.getData({
    data: { ...req.query, userLoggedIn },
    dataMethod: new Comment().getReplies,
    module: "replies",
    res,
  });
};

exports.getPostsLikes = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  helpers.getData({
    data: { ...req.query, userLoggedIn, field: "postsLikes.postId" },
    countMethod: new PostsLikes().getCount,
    dataMethod: new PostsLikes().getLikes,
    module: "postLikes",
    res,
    key: "likeId",
    latestRecordMethod: new PostsLikes(),
  });
};

exports.getCommentsLikes = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  helpers.getData({
    data: { ...req.query, userLoggedIn, field: "commentLikes.commentId" },
    countMethod: new CommentLikes().getCount,
    dataMethod: new CommentLikes().getCommentsLikes,
    module: "commentLikes",
    res,
    key: "likeId",
    latestRecordMethod: new CommentLikes(),
  });
};
