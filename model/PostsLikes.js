const db = require("../util/database");
const Post = require("./Post");

module.exports = class PostsLikes extends Post {
  tableName = "postsLikes";
  primaryKey = "likeId";
  dbColumns = ["userId", "postId", "createdAt"];
  foreignKey = "postId";

  getLikes(data) {
    let sql = `SELECT users.*, postsLikes.likeId,
    MAX(CASE WHEN followers.followerId = ? THEN "1" ELSE "0" END) AS followedByUser
    FROM postsLikes 
     LEFT JOIN users ON users.userId = postsLikes.userId
     LEFT JOIN followers ON followers.followingId = postsLikes.userId
     WHERE postsLikes.postId = ? AND postsLikes.likeId < ?
     GROUP BY users.userId, postsLikes.likeId
     ORDER BY postsLikes.likeId DESC
     LIMIT ? ;`;

    let values = [
      data.userLoggedIn,
      data.identifier,
      !!data.lastElementId ? data.lastElementId : data.latestRecordId,
      data.pageSize,
    ];

    return db.execute(sql, values);
  }
};
