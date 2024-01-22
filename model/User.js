const Model = require("./Model");
const db = require("../util/database");

module.exports = class User extends Model {
  tableName = "users";
  primaryKey = "userId";
  dbColumns = [
    "name",
    "lastname",
    "username",
    "about",
    "country",
    "userImgURL",
    "email",
    "password",
  ];

  getUsersCount(data) {
    let sql = `SELECT COUNT(*)
    FROM users
     WHERE users.username LIKE '${data.value}%'
      AND NOT users.userId = ${data.userLoggedIn}
      `;
    return db.execute(sql);
  }

  getAllUsers(data) {
    let sql = `
        SELECT users.*, followers.followId,
        IFNULL(SUM(CASE WHEN followers.followerId = ${
          data.userLoggedIn
        } THEN 1 ELSE 0 END), 0) AS followedByUser
        FROM users 
        LEFT JOIN followers ON users.userId = followers.followingId AND followers.followerId = ${
          data.userLoggedIn
        }
        WHERE users.username LIKE '${data.value}%' AND NOT users.userId = ${
      data.userLoggedIn
    } 
        GROUP BY users.userId,followers.followId
        LIMIT ${+data.pageSize} OFFSET ${data.offset};
    `;
    return db.execute(sql);
  }

  getUserData(username, userId, userLoggedIn) {
    let sql = `SELECT users.*,
    (SELECT COUNT(*) FROM followers WHERE followers.followerId = ?) as followersCount,
    IFNULL(SUM(CASE WHEN followers.followerId = ? THEN 1 ELSE 0 END), 0) AS followedByUser
    FROM users 
    LEFT JOIN followers ON users.userId = followers.followingId 
    WHERE users.username = ?
    GROUP BY users.userId
    `;
    return db.execute(sql, [userId, userLoggedIn, username]);
  }

  getPostLikesNotifications(userId) {
    let sql = `SELECT postsLikes.userId, posts.*
    FROM users 
    LEFT JOIN posts ON users.userId = posts.creatorId 
    LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
    WHERE posts.creatorId  = ? AND postsLikes.userId IS NOT NULL AND postsLikes.userId != ${userId}
    GROUP BY users.userId,postsLikes.userId,posts.postId
    `;
    return db.execute(sql, [userId]);
  }

  getCommentsNotifications(userId) {
    let sql = `SELECT comments.userId, posts.*, users.username,users.userImgURL
    FROM users 
    LEFT JOIN posts ON users.userId = posts.creatorId 
    LEFT JOIN comments ON posts.postId = comments.postId
    WHERE posts.creatorId = ? AND comments.userId IS NOT NULL
    GROUP BY users.userId,posts.postId,comments.userId
    `;
    return db.execute(sql, [userId]);
  }

  getCommentsLikesNotifications(userId) {
    let sql = `
    SELECT commentLikes.userId, posts.postImage, GROUP_CONCAT(users.username) AS likedUsernames, users.userImgURL
    FROM users 
    LEFT JOIN posts ON users.userId = posts.creatorId 
    LEFT JOIN comments ON posts.postId = comments.postId
    LEFT JOIN commentLikes ON comments.commentId = commentLikes.commentId
    WHERE comments.userId = ? AND commentLikes.userId IS NOT NULL
    GROUP BY commentLikes.userId, posts.postId
`;
    return db.execute(sql, [userId]);
  }
};
