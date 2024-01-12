const db = require("../util/database");
const Comment = require("./Post");

module.exports = class CommentLikes extends Comment {
  tableName = "commentLikes";
  primaryKey = "likeId";
  dbColumns = ["userId", "commentId"];
  foreignKey = "commentId";

  getCommentsLikes(commentId, pageSize, offset, userLoggedIn) {
    let sql = `SELECT users.*, commentLikes.likeId,
    IFNULL(SUM(CASE WHEN followers.followerId = ? THEN 1 ELSE 0 END), 0) AS followedByUser
    FROM commentLikes 
     LEFT JOIN users ON users.userId = commentLikes.userId
     LEFT JOIN followers ON followers.followingId = commentLikes.userId
     WHERE commentLikes.commentId = ?
     GROUP BY users.userId, commentLikes.likeId
     LIMIT ? OFFSET ?`;
    return db.query(sql, [userLoggedIn, commentId, pageSize, offset]);
  }
};
