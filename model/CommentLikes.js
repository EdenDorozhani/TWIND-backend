const db = require("../util/database");
const Comment = require("./Post");

module.exports = class CommentLikes extends Comment {
  tableName = "commentLikes";
  primaryKey = "likeId";
  dbColumns = ["userId", "commentId"];

  getRecord(userLoggedIn, commentId) {
    return db.execute(
      `SELECT * FROM ${this.tableName} WHERE userId = ${userLoggedIn} AND commentId = ${commentId}`
    );
  }

  getCommentsLikes(commentId, pageSize, offset) {
    let sql = `SELECT users.*, commentLikes.likeId
    FROM commentLikes 
     LEFT JOIN users ON users.userId = commentLikes.userId
     WHERE commentLikes.commentId = ? LIMIT ? OFFSET ?`;
    return db.query(sql, [
      commentId,
      parseInt(pageSize, 10),
      parseInt(offset, 10),
    ]);
  }
};
