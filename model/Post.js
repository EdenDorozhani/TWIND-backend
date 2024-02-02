const Model = require("./Model");
const db = require("../util/database");

module.exports = class Post extends Model {
  tableName = "posts";
  primaryKey = "postId";

  getFollowingPostsData = (data) => {
    let sql = `
    SELECT
      posts.*, users.userImgURL, users.username,
      COUNT(DISTINCT postsLikes.likeId) AS likesCount,
      (SELECT COUNT(*) FROM comments WHERE comments.postId = posts.postId) AS commentsCount,
      MAX(CASE WHEN postsLikes.userId = ? THEN "1" ELSE "0" END) AS likedByUser
    FROM posts
    LEFT JOIN followers ON posts.creatorId = followers.followingId
    LEFT JOIN users ON posts.creatorId = users.userId
    LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
    WHERE (followers.followerId = ? OR posts.creatorId = ?) AND posts.postId < ?
    GROUP BY posts.postId
    ORDER BY createdAt DESC
    LIMIT ?;`;

    let values = [
      data.userLoggedIn,
      data.userLoggedIn,
      data.userLoggedIn,
      !!data.lastElementId ? data.lastElementId : data.latestRecordId,
      data.pageSize,
    ];

    return db.execute(sql, values);
  };

  getFollowingPostsCount = (data) => {
    let sql = `
    SELECT COUNT(*)
    FROM posts
    WHERE creatorId = ? OR creatorId IN (SELECT followingId FROM followers WHERE followerId = ?);
    `;
    return db.execute(sql, [data.userLoggedIn, data.userLoggedIn]);
  };

  getSinglePost = (postId, identifier) => {
    let sql = `
    SELECT posts.*, users.username, users.userImgURL, COUNT(DISTINCT postsLikes.likeId) AS likes,
    MAX(CASE WHEN postsLikes.userId = ? THEN "1" ELSE "0" END) AS likedByUser,
    MAX(CASE WHEN followers.followerId = ? THEN "1" ELSE "0" END) AS followedByUser
    FROM posts
    LEFT JOIN users ON posts.creatorId = users.userId
    LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
    LEFT JOIN followers ON posts.creatorId = followers.followingId 
    WHERE posts.postId = ?
    GROUP BY
    posts.postId, users.userId;
  `;

    const values = [identifier, identifier, postId];

    return db.execute(sql, values);
  };
};
