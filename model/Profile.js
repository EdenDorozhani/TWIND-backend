const db = require("../util/database");
const Model = require("./Model");

module.exports = class Profile extends Model {
  getProfilePostsData(username, pageSize, offset) {
    let sql = `SELECT posts.*, 
        COUNT(postsLikes.likeId) as likeCount,
        (SELECT COUNT(*)
        FROM comments
        WHERE comments.postId = posts.postId) AS comments
        FROM posts 
        LEFT JOIN users ON posts.creatorId = users.userId
        LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
        WHERE users.username = ?
        GROUP BY posts.postId
        ORDER BY posts.createdAt DESC 
        LIMIT ${+pageSize} 
        OFFSET ${+offset}`;
    return db.execute(sql, [username]);
  }

  getUserData(username, userId, userLoggedIn) {
    let sql = `SELECT users.*,
    (SELECT COUNT(*) FROM followers WHERE followers.followerId = ?) as followersCount,
    IFNULL(SUM(CASE WHEN followers.followerId = ? THEN 1 ELSE 0 END), 0) AS followedByUser
    FROM users 
    LEFT JOIN followers ON users.userId = followers.followerId 
    WHERE users.username = ?
    GROUP BY users.userId
    `;
    return db.execute(sql, [userId, userLoggedIn, username]);
  }
};
