const Model = require("./Model");
const db = require("../util/database");

module.exports = class Post extends Model {
  tableName = "posts";
  primaryKey = "postId";

  getFollowingPostsData = (data) => {
    let sql = `SELECT
    posts.*, users.userImgURL, users.username,
    COUNT(DISTINCT postsLikes.likeId) AS likes,
    (SELECT COUNT(*) FROM comments WHERE comments.postId = posts.postId) AS comments,
    MAX(CASE WHEN postsLikes.userId = ${
      data.userLoggedIn
    } THEN "1" ELSE "0" END) AS likedByUser
    FROM posts
    INNER JOIN followers ON posts.creatorId = followers.followingId 
    LEFT JOIN users ON posts.creatorId = users.userId
    LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
    WHERE followers.followerId = ${data.userLoggedIn}
    GROUP BY posts.postId
    ORDER BY createdAt DESC
    LIMIT ${+data.pageSize} OFFSET ${data.offset};`;
    return db.execute(sql);
  };

  getFollowingPostsCount = (data) => {
    let sql = `SELECT COUNT(*)
      FROM posts 
      INNER JOIN users ON posts.creatorId = users.userId
      INNER JOIN followers ON posts.creatorId = followers.followingId
      WHERE followers.followerId = ${data.userLoggedIn}
      `;
    return db.execute(sql);
  };

  getSinglePost = (postId, userLoggedIn) => {
    let sql = `
    SELECT posts.*, users.username, users.userImgURL, COUNT(DISTINCT postsLikes.likeId) AS likes,
    MAX(CASE WHEN postsLikes.userId = ${userLoggedIn} THEN "1" ELSE "0" END) AS likedByUser,
    MAX(CASE WHEN followers.followerId = ${userLoggedIn} THEN "1" ELSE "0" END) AS followedByUser
    FROM posts
    LEFT JOIN users ON posts.creatorId = users.userId
    LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
    LEFT JOIN followers ON posts.creatorId = followers.followingId 
    WHERE posts.postId = ${postId}
    GROUP BY
    posts.postId, users.userId;
  `;
    return db.execute(sql);
  };
};
