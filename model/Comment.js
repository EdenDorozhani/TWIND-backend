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
    IFNULL(SUM(CASE WHEN commentLikes.userId = ${
      data.userLoggedIn
    } THEN 1 ELSE 0 END), 0) AS likedByUser,
    IFNULL(replyCount.replyCount,0) AS totalReplies
    FROM comments
    LEFT JOIN users ON comments.userId = users.userId
    LEFT JOIN commentLikes ON comments.commentId = commentLikes.commentId
    LEFT JOIN (
    SELECT comments.reply, COUNT(*) AS replyCount
    FROM comments
    WHERE postId = ${data.identifier} AND comments.reply IS NOT NULL
    GROUP BY comments.reply) AS replyCount ON comments.commentId = replyCount.reply
    WHERE comments.postId = ${data.identifier} AND comments.reply IS NULL
    GROUP BY comments.commentId,replyCount.replyCount
    ORDER BY comments.commentId DESC
    LIMIT ${+data.pageSize} OFFSET ${data.offset};
`;
    return db.execute(sql);
  };

  getReplies = (data) => {
    let sql = `
    SELECT comments.*, users.userImgURL, users.username,
    COUNT(commentLikes.commentId) AS commentsLikeCount,
    IFNULL(SUM(CASE WHEN commentLikes.userId = ${
      data.userLoggedIn
    } THEN 1 ELSE 0 END), 0) AS likedByUser
    FROM comments
    LEFT JOIN users ON comments.userId = users.userId
    LEFT JOIN commentLikes ON comments.commentId = commentLikes.commentId
    WHERE comments.reply = ${data.identifier} AND comments.reply IS NOT NULL
    GROUP BY comments.commentId
    ORDER BY createdAt DESC
    LIMIT ${+data.pageSize} OFFSET ${data.offset};           
  `;
    return db.execute(sql);
  };

  getAddedCommentData = (id) => {
    let sql = `SELECT comments.*, users.userImgURL, users.username 
        FROM comments 
        LEFT JOIN users ON comments.userId = users.userId 
        WHERE comments.commentId = ${id}`;
    return db.execute(sql);
  };

  getCommentsCount = (data) => {
    let sql = `SELECT COUNT(*) FROM comments WHERE comments.reply IS NULL AND comments.postId = ${data.identifier}`;
    return this.db.execute(sql);
  };
};
