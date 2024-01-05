const db = require("../util/database");
const Model = require("./Model");

module.exports = class Profile extends Model {
  getProfilePostsData(username, pageSize, offset) {
    let sql = `SELECT posts.*, 
        COUNT(postsLikes.likeId) as likeCount,
        COUNT(comments.commentId) AS comments
        FROM posts 
        LEFT JOIN users ON posts.creatorId = users.userId
        LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
        LEFT JOIN comments ON comments.postId = posts.postId
        WHERE users.username = ?
        GROUP BY posts.postId
        ORDER BY posts.createdAt DESC 
        LIMIT ${+pageSize} 
        OFFSET ${+offset}`;
    return db.execute(sql, [username]);
  }
};
