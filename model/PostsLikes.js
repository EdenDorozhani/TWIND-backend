const db = require("../util/database");
const Post = require("./Post");

module.exports = class PostsLikes extends Post {
  tableName = "postsLikes";
  primaryKey = "likeId";
  dbColumns = ["userId", "postId"];

  getRecord(userLoggedIn, postId) {
    return db.execute(
      `SELECT * FROM ${this.tableName} WHERE userId = ${userLoggedIn} AND postId = ${postId}`
    );
  }

  getLikes(postId, pageSize, offset) {
    let sql = `SELECT users.*, postsLikes.likeId
    FROM postsLikes 
     LEFT JOIN users ON users.userId = postsLikes.userId
     WHERE postsLikes.postId = ? LIMIT ? OFFSET ?`;
    return db.query(sql, [postId, pageSize, offset]);
  }
};
