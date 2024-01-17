const Model = require("../model/Model");
const Post = require("../model/Post");
const Response = require("../model/Response");
const User = require("../model/User");

exports.getUsersPosts = async (req, res) => {
  const { pageSize, page } = req.query;
  const offset = page * pageSize - pageSize;
  try {
    const profilePostsResponse = await new Model().getPostsData(
      "",
      pageSize,
      offset
    );
    const postsCount = await new Post().getCount();
    const count = postsCount[0][0]["COUNT(*)"];
    res.json(
      new Response(true, "data fetched successfully", {
        data: profilePostsResponse[0],
        count,
      })
    );
  } catch (err) {
    console.log(err);
  }
};

exports.getAllUsers = async (req, res) => {
  const userLoggedIn = req.userLoggedIn;
  const page = req.query.page;
  const pageSize = +req.query.pageSize;
  const offset = +page * pageSize - pageSize;
  const searchValue = req.query.value;
  const identifier = req.query.identifier;
  const response = await new User().getAllUsers(
    searchValue,
    userLoggedIn,
    pageSize,
    offset,
    identifier
  );
  const usersCount = await new User().getUsersCount(userLoggedIn, searchValue);
  const count = usersCount[0][0]["COUNT(*)"];
  res.json(
    new Response(true, "users are fetched successfully", {
      data: response[0],
      module: "Followers",
      count,
    })
  );
};
