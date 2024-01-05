const db = require("../util/database");
const Post = require("./Post");

module.exports = class Comment extends Post {
  tableName = "comments";
  primaryKey = "commentId";
  dbColumns = ["userId", "postId", "description", "createdAt", "reply"];

  getAllComments(orderBy, pageSize, offset, userLoggedIn, postId) {
    let sql = `
    SELECT comments.*, users.userImgURL, users.username,
    COUNT(commentLikes.commentId) AS commentsLikeCount,
    IFNULL(SUM(CASE WHEN commentLikes.userId = ${userLoggedIn} THEN 1 ELSE 0 END), 0) AS likedByUser,
    IFNULL(replyCount.replyCount,0) AS totalReplies
    FROM comments
    LEFT JOIN users ON comments.userId = users.userId
    LEFT JOIN commentLikes ON comments.commentId = commentLikes.commentId
    LEFT JOIN (
    SELECT comments.reply, COUNT(*) AS replyCount
    FROM comments
    WHERE postId = ${postId} AND comments.reply IS NOT NULL
    GROUP BY comments.reply) AS replyCount ON comments.commentId = replyCount.reply
    WHERE comments.postId = ${postId} AND comments.reply IS NULL
    GROUP BY comments.commentId,replyCount.replyCount
    ORDER BY ${orderBy} DESC
    LIMIT ${pageSize} OFFSET ${offset};
`;
    return db.execute(sql);
  }

  getReplies(userLoggedIn, commentId, orderBy, pageSize, offset) {
    let sql = `
    SELECT comments.*, users.userImgURL, users.username,
    COUNT(commentLikes.commentId) AS commentsLikeCount,
    IFNULL(SUM(CASE WHEN commentLikes.userId = ${userLoggedIn} THEN 1 ELSE 0 END), 0) AS likedByUser
    FROM comments
    LEFT JOIN users ON comments.userId = users.userId
    LEFT JOIN commentLikes ON comments.commentId = commentLikes.commentId
    WHERE comments.reply = ${commentId} AND comments.reply IS NOT NULL
    GROUP BY comments.commentId
    ORDER BY ${orderBy} DESC
    LIMIT ${pageSize} OFFSET ${offset};           
  `;
    return db.execute(sql);
  }

  getAddedCommentData(id) {
    let sql = `SELECT comments.*, users.userImgURL, users.username 
        FROM comments 
        LEFT JOIN users ON comments.userId = users.userId 
        WHERE comments.commentId = ${id}`;
    return db.execute(sql);
  }

  getCommentsCount(postId) {
    let sql = `SELECT COUNT(*) FROM ${this.tableName} WHERE comments.reply IS NULL AND comments.postId = ${postId}`;
    return this.db.execute(sql);
  }
};
