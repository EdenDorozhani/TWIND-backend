const db = require("../util/database");
const Post = require("./Post");

module.exports = class Comment extends Post {
  tableName = "comments";
  primaryKey = "commentId";
  dbColumns = ["userId", "postId", "description", "createdAt", "reply"];

  getAllComments = (data) => {
    let sql = `
    SELECT comments.*, users.userImgURL, users.username,
    COUNT(commentLikes.commentId) AS commentsLikeCount,
    IFNULL(SUM(CASE WHEN commentLikes.userId = ? THEN 1 ELSE 0 END), 0) AS likedByUser,
    MAX(replyCount.replyCount) AS totalReplies
    FROM comments
    LEFT JOIN users ON comments.userId = users.userId
    LEFT JOIN commentLikes ON comments.commentId = commentLikes.commentId
    LEFT JOIN (
    SELECT comments.reply, COUNT(*) AS replyCount
    FROM comments
    WHERE postId = ? AND comments.reply IS NOT NULL
    GROUP BY comments.reply) AS replyCount ON comments.commentId = replyCount.reply
    WHERE (comments.postId = ? AND comments.reply IS NULL) AND comments.commentId < ?
    GROUP BY comments.commentId
    ORDER BY comments.commentId DESC
    LIMIT ?;
`;
    let values = [
      data.userLoggedIn,
      data.identifier,
      data.identifier,
      !!data.lastElementId ? data.lastElementId : data.latestRecordId,
      data.pageSize,
    ];
    return db.execute(sql, values);
  };

  getReplies = (data) => {
    let sql = `
    SELECT comments.*, users.userImgURL, users.username,
    COUNT(commentLikes.commentId) AS commentsLikeCount,
    IFNULL(SUM(CASE WHEN commentLikes.userId = ? THEN 1 ELSE 0 END), 0) AS likedByUser
    FROM comments
    LEFT JOIN users ON comments.userId = users.userId
    LEFT JOIN commentLikes ON comments.commentId = commentLikes.commentId
    WHERE comments.reply = ? AND comments.reply IS NOT NULL
    GROUP BY comments.commentId
    ORDER BY createdAt DESC
    LIMIT ? OFFSET ${data.offset};           
  `;
    const values = [data.userLoggedIn, data.identifier, data.pageSize];
    return db.execute(sql, values);
  };

  getAddedCommentData = (id) => {
    let sql = `SELECT comments.*, users.userImgURL, users.username 
        FROM comments 
        LEFT JOIN users ON comments.userId = users.userId 
        WHERE comments.commentId = ?`;
    return db.execute(sql, [id]);
  };

  getCommentsCount = (data) => {
    let sql = `SELECT COUNT(*) FROM comments WHERE comments.reply IS NULL AND comments.postId = ?`;
    return this.db.execute(sql, [data.identifier]);
  };
};
