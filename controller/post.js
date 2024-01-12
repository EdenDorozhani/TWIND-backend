const { validationResult } = require("express-validator");
const PostsLikes = require("../model/PostsLikes");
const Comment = require("../model/Comment");
const Response = require("../model/Response");
const CommentLikes = require("../model/CommentLikes");

const updateLikes = async (keyWord, body, id, userId, obj, res) => {
  if (keyWord === "like") {
    try {
      const dataToInsert = obj.formatFormData(body);
      await obj.addData(dataToInsert);
      res.json(new Response(true));
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const record = await obj.getRecord(userId, id);
      const recordId = record[0][0].likeId;
      await obj.deleteData(recordId);
      res.json(new Response(true));
    } catch (err) {
      console.log(err);
    }
  }
};

exports.updatePostLikes = async (req, res) => {
  const keyWord = req.body.keyWord;
  const userId = req.body.userId;
  const postId = req.body.postId;
  updateLikes(keyWord, req.body, postId, userId, new PostsLikes(), res);
};

exports.updateCommentLikes = async (req, res) => {
  const keyWord = req.body.keyWord;
  const userId = req.body.userId;
  const commentId = req.body.commentId;
  updateLikes(keyWord, req.body, commentId, userId, new CommentLikes(), res);
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
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  const offset = +page * pageSize - pageSize;
  const postId = req.query.identifier;
  const countResponse = await new Comment().getCommentsCount(postId);
  const count = countResponse[0][0]["COUNT(*)"];
  const response = await new Comment().getAllComments(
    "createdAt",
    pageSize,
    offset,
    userLoggedIn,
    postId
  );
  res.json(
    new Response(true, "comments are fetched successfully", {
      data: response[0],
      count,
    })
  );
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
  const page = req.query.page;
  const pageSize = +req.query.pageSize;
  const offset = +page * +pageSize - +pageSize;
  const commentId = req.query.identifier;
  const response = await new Comment().getReplies(
    userLoggedIn,
    commentId,
    "createdAt",
    pageSize,
    offset
  );
  res.json(
    new Response(true, "replies are fetched successfully", {
      replies: response[0],
      module: "replies",
      page: +page,
    })
  );
};

exports.getPostsLikes = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  const page = req.query.page;
  const pageSize = +req.query.pageSize;
  const offset = +page * pageSize - pageSize;
  const postId = req.query.identifier;
  const countResponse = await new PostsLikes().getCount(
    postId,
    "postsLikes.postId"
  );
  const count = countResponse[0][0]["COUNT(*)"];
  const response = await new PostsLikes().getLikes(
    postId,
    pageSize,
    offset,
    userLoggedIn
  );
  const likes = response[0];
  res.json(
    new Response(true, "likes are fetched successfully", {
      data: likes,
      module: "postLikes",
      count: count,
    })
  );
};

exports.getCommentsLikes = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  const page = req.query.page;
  const pageSize = +req.query.pageSize;
  const offset = +page * pageSize - pageSize;
  const commentId = req.query.identifier;
  const countResponse = await new CommentLikes().getCount(
    commentId,
    "commentLikes.commentId"
  );
  const count = countResponse[0][0]["COUNT(*)"];
  const response = await new CommentLikes().getCommentsLikes(
    commentId,
    pageSize,
    offset,
    userLoggedIn
  );
  const likes = response[0];
  res.json(
    new Response(true, "likes are fetched successfully", {
      data: likes,
      module: "commentLikes",
      count: count,
    })
  );
};
