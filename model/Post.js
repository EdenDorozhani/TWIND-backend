const Model = require("./Model");
const db = require("../util/database");

module.exports = class Post extends Model {
  tableName = "posts";
  primaryKey = "postId";

  getFollowingPostsData = (data) => {
    let sql = `SELECT
    posts.*, users.userImgURL, users.username,
    COUNT(DISTINCT postsLikes.likeId) AS likesCount,
    (SELECT COUNT(*) FROM comments WHERE comments.postId = posts.postId) AS commentsCount,
    MAX(CASE WHEN postsLikes.userId = ${
      data.identifier
    } THEN "1" ELSE "0" END) AS likedByUser
    FROM posts
    LEFT JOIN followers ON posts.creatorId = followers.followingId
    LEFT JOIN users ON posts.creatorId = users.userId
    LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
    WHERE followers.followerId = ${data.identifier} OR posts.creatorId = ${
      data.identifier
    }
    GROUP BY posts.postId
    ORDER BY createdAt DESC
    LIMIT ${+data.pageSize} OFFSET ${data.offset};`;
    return db.execute(sql);
  };

  getFollowingPostsCount = (data) => {
    let sql = `
    SELECT COUNT(*)
    FROM posts
    WHERE creatorId = ? OR creatorId IN (SELECT followingId FROM followers WHERE followerId = ?);
    `;
    return db.execute(sql, [data.identifier, data.identifier]);
  };

  getSinglePost = (postId, identifier) => {
    let sql = `
    SELECT posts.*, users.username, users.userImgURL, COUNT(DISTINCT postsLikes.likeId) AS likes,
    MAX(CASE WHEN postsLikes.userId = ${identifier} THEN "1" ELSE "0" END) AS likedByUser,
    MAX(CASE WHEN followers.followerId = ${identifier} THEN "1" ELSE "0" END) AS followedByUser
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
