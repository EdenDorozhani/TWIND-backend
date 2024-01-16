const { validationResult } = require("express-validator");
const Post = require("../model/Post");
const Response = require("../model/Response");
const User = require("../model/User");

exports.getUserData = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  const response = await new User().getOne("userId", userLoggedIn);
  const userData = response[0][0];
  res.json(new Response(true, "user data is fetched", userData));
};

exports.getPosts = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  const offset = +page * pageSize - pageSize;
  const countResponse = await new Post().getFollowingPostsCount(userLoggedIn);
  const count = countResponse[0][0].postsCount;
  const response = await new Post().getFollowingPostsData(
    "createdAt",
    pageSize,
    offset,
    userLoggedIn
  );
  res.json(
    new Response(true, "posts are fetched successfully", {
      data: response[0],
      count,
    })
  );
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
  const { identifier } = req.query;
  console.log(identifier);
  try {
    await new Post().deleteData(identifier);
    res.json(
      new Response(
        true,
        `post with id:${identifier} has been deleted successfully`,
        identifier
      )
    );
  } catch (err) {
    let response = new Response(false, err.message);
    res.status(500).send(response);
  }
};

exports.getSinglePost = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  const { postId } = req.query;
  try {
    const response = await new Post().getSinglePost(postId, userLoggedIn);
    const data = response[0][0];
    if (data.postId === null) {
      throw new Error("Post is not found");
    }
    res.json(new Response(true, "data is fetched successfully", data));
  } catch (err) {
    res.status(500).json(new Response(false, err.message));
  }
};