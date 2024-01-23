const db = require("../util/database");
const Post = require("./Post");

module.exports = class PostsLikes extends Post {
  tableName = "postsLikes";
  primaryKey = "likeId";
  dbColumns = ["userId", "postId", "createdAt"];
  foreignKey = "postId";

  getLikes(data) {
    let sql = `SELECT users.*, postsLikes.likeId,
    IFNULL(SUM(CASE WHEN followers.followerId = ? THEN 1 ELSE 0 END), 0) AS followedByUser
    FROM postsLikes 
     LEFT JOIN users ON users.userId = postsLikes.userId
     LEFT JOIN followers ON followers.followingId = postsLikes.userId
     WHERE postsLikes.postId = ${data.identifier}
     GROUP BY users.userId, postsLikes.likeId
     LIMIT ${+data.pageSize} OFFSET ${data.offset};`;
    return db.query(sql, [data.userLoggedIn]);
  }
};
