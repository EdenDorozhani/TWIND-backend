const { validationResult } = require("express-validator");
const PostsLikes = require("../model/PostsLikes");
const Comment = require("../model/Comment");
const Response = require("../model/Response");
const CommentLikes = require("../model/CommentLikes");
const helpers = require("./helpers");

exports.updatePostLikes = async (req, res) => {
  const userId = req.body.uupdatePostLikesserId;
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
  try {
    const dataToInsert = new Comment().formatFormData({
      ...req.body,
      createdAt,
    });
    const addComment = await new Comment().addData(dataToInsert);
    const commentId = addComment[0].insertId;
    const commentData = await new Comment().getAddedCommentData(commentId);
    const responseData = commentData[0][0];
    await res.json(
      new Response(true, "comment added successfully", responseData)
    );
  } catch (err) {
    console.log(err);
  }
};

exports.getComments = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  helpers.getData({
    data: { ...req.query, userLoggedIn },
    countMethod: new Comment().getCommentsCount,
    dataMethod: new Comment().getAllComments,
    module: "Comments",
    res,
  });
};

exports.deleteComment = async (req, res) => {
  const { identifier } = req.query;
  try {
    await new Comment().deleteData(identifier);
    res.json(
      new Response(
        true,
        `comment with id:${identifier} has been deleted successfully`,
        identifier
      )
    );
  } catch (err) {
    let response = new Response(false, err.message);
    res.status(500).send(response);
  }
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
  });
};
