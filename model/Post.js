const Model = require("./Model");
const db = require("../util/database");

module.exports = class Post extends Model {
  tableName = "posts";
  primaryKey = "postId";

  getPostsData = (orderBy, pageSize, offset, userLoggedIn) => {
    let sql = `SELECT posts.*, users.userImgURL, users.username, COUNT(postsLikes.likeId) AS likes,
    (SELECT COUNT(*)
        FROM comments
        WHERE comments.postId = posts.postId) AS comments,
    IFNULL(SUM(CASE WHEN postsLikes.userId = ${userLoggedIn} THEN 1 ELSE 0 END), 0) AS likedByUser
    FROM posts
    LEFT JOIN users ON posts.creatorId = users.userId
    LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
    GROUP BY posts.postId
    ORDER BY ${orderBy} DESC 
    LIMIT ${pageSize} OFFSET ${offset}`;
    return db.execute(sql);
  };

  getSinglePost = (postId, userLoggedIn) => {
    let sql = `
    SELECT posts.*, users.username, users.userImgURL, COUNT(postsLikes.likeId) AS likes,
    IFNULL(SUM(CASE WHEN postsLikes.userId = ${userLoggedIn} THEN 1 ELSE 0 END), 0) AS likedByUser
    FROM posts
    LEFT JOIN users ON posts.creatorId = users.userId
    LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
    WHERE posts.postId = ${postId}
  `;
    return db.execute(sql);
  };
};
