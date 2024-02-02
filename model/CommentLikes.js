const db = require("../util/database");
const Comment = require("./Post");

module.exports = class CommentLikes extends Comment {
  tableName = "commentLikes";
  primaryKey = "likeId";
  dbColumns = ["userId", "commentId", "createdAt"];
  foreignKey = "commentId";

  getCommentsLikes(data) {
    let sql = `SELECT users.*, commentLikes.likeId,
    IFNULL(SUM(CASE WHEN followers.followerId = ? THEN 1 ELSE 0 END), 0) AS followedByUser
    FROM commentLikes 
     LEFT JOIN users ON users.userId = commentLikes.userId
     LEFT JOIN followers ON followers.followingId = commentLikes.userId
     WHERE commentLikes.commentId = ? AND commentLikes.likeId < ?
     GROUP BY users.userId, commentLikes.likeId
     ORDER BY commentLikes.likeId DESC
     LIMIT ?`;

    let values = [
      data.userLoggedIn,
      data.identifier,
      !!data.lastElementId ? data.lastElementId : data.latestRecordId,
      data.pageSize,
    ];

    return db.execute(sql, values);
  }
};
