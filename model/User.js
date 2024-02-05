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
     WHERE users.username LIKE '%${data.value}%'
      `;

    return db.execute(sql);
  }

  getAllUsers(data) {
    let sql = `
        SELECT users.*,
        IFNULL(SUM(CASE WHEN followers.followerId = ? THEN 1 ELSE 0 END), 0) AS followedByUser
        FROM users 
        LEFT JOIN followers ON users.userId = followers.followingId AND followers.followerId = ?
        WHERE users.username LIKE '%${data.value}%'  
        GROUP BY users.userId
        ORDER BY users.username LIKE '${data.value}%' DESC
        LIMIT ?;
    `;
    let values = [data.userLoggedIn, data.userLoggedIn, data.pageSize];

    return db.execute(sql, values);
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

  getPostLikesNotifications(userId, itemsPerPage, offset) {
    let sql = `SELECT 
    'postsLikes' AS type, 
    posts.postImage, 
    postsLikes.createdAt, 
    users.username, 
    users.userImgURL,
    posts.postId,
    (
    SELECT COUNT (*) - 1
    FROM postsLikes 
    WHERE postsLikes.postId = posts.postId AND postsLikes.userId != ${userId}
    ) AS others
    FROM postsLikes 
    LEFT JOIN posts ON postsLikes.postId = posts.postId 
    LEFT JOIN users ON postsLikes.userId = users.userId
    WHERE posts.creatorId  = ? AND postsLikes.userId IS NOT NULL AND postsLikes.userId != ${userId} AND postsLikes.likeId IN 
    (
        SELECT MAX(likeId) AS maxCommentId
        FROM postsLikes
        WHERE postId = posts.postId
        GROUP BY postId
    )
    AND postsLikes.createdAt >= DATE_ADD(CURDATE(), INTERVAL -3 MONTH)
    GROUP BY users.userId, postsLikes.likeId 
    LIMIT ${+itemsPerPage} OFFSET ${offset};
    `;
    return db.execute(sql, [userId]);
  }

  getPostsLikesNotificationsCount(userId) {
    let sql = ` SELECT 
    COUNT(*) as postsLikesCount
    FROM postsLikes 
    LEFT JOIN posts ON postsLikes.postId = posts.postId 
    LEFT JOIN users ON postsLikes.userId = users.userId
    WHERE posts.creatorId  = ? AND postsLikes.userId IS NOT NULL AND postsLikes.userId != ${userId} AND postsLikes.likeId IN 
    (
        SELECT MAX(likeId) AS maxCommentId
        FROM postsLikes
        WHERE postId = posts.postId
        GROUP BY postId
    )
    AND postsLikes.createdAt >= DATE_ADD(CURDATE(), INTERVAL -3 MONTH)
    `;
    return db.execute(sql, [userId]);
  }

  getCommentsNotifications(userId, itemsPerPage, offset) {
    let sql = `SELECT 
    'comments' AS type,
    users.username,
    users.userImgURL, 
    posts.postImage,
    comments.createdAt,
    posts.postId,
    comments.description,
    (
      SELECT COUNT(*) - 1
      FROM comments AS allComments
      WHERE allComments.postId = posts.postId AND allComments.userId != ${userId}
    ) 
    AS others
    FROM comments
    LEFT JOIN users ON comments.userId = users.userId
    LEFT JOIN  posts ON comments.postId = posts.postId
    LEFT JOIN users AS postCreator ON posts.creatorId = postCreator.userId
    WHERE posts.creatorId = ? AND comments.userId IS NOT NULL AND users.userId != ?
    AND comments.commentId IN 
    (
        SELECT MAX(commentId) AS maxCommentId
        FROM comments
        WHERE postId = posts.postId
        GROUP BY postId
    )
    AND comments.createdAt >= DATE_ADD(CURDATE(), INTERVAL -3 MONTH)
    GROUP BY comments.userId, posts.postId, comments.commentId
    LIMIT ${+itemsPerPage} OFFSET ${offset};
    `;
    return db.execute(sql, [userId, userId]);
  }

  getCommentsNotificationsCount(userId) {
    let sql = `SELECT 
    COUNT(*) as commentsCount
    FROM comments
    LEFT JOIN users ON comments.userId = users.userId
    LEFT JOIN  posts ON comments.postId = posts.postId
    LEFT JOIN users AS postCreator ON posts.creatorId = postCreator.userId
    WHERE posts.creatorId = ? AND comments.userId IS NOT NULL AND users.userId != ?
    AND comments.commentId IN 
    (
        SELECT MAX(commentId) AS maxCommentId
        FROM comments
        WHERE postId = posts.postId
        GROUP BY postId
    )
    AND comments.createdAt >= DATE_ADD(CURDATE(), INTERVAL -3 MONTH)
    `;
    return db.execute(sql, [userId, userId]);
  }

  getCommentsLikesNotifications(userId, itemsPerPage, offset) {
    let sql = `
    SELECT 
    'commentLikes' AS type, 
    commentLikes.userId, 
    posts.postId, 
    commentLikes.createdAt, 
    users.username, 
    users.userImgURL, 
    comments.description, 
    posts.postImage,
    (
      SELECT COUNT (*) - 1
      FROM commentLikes 
      WHERE commentLikes.commentId = comments.commentId AND commentLikes.userId != ${userId}
      ) AS others
    FROM commentLikes
    LEFT JOIN comments ON commentLikes.commentId = comments.commentId
    LEFT JOIN users ON commentLikes.userId = users.userId
    LEFT JOIN posts ON comments.postId = posts.postId
    WHERE comments.userId = ? AND commentLikes.userId IS NOT NULL AND commentLikes.userId  != ? AND commentLikes.likeId IN 
    (
        SELECT MAX(likeId)
        FROM commentLikes
        WHERE commentId = comments.commentId
        GROUP BY commentId
    )
    AND commentLikes.createdAt >= DATE_ADD(CURDATE(), INTERVAL -3 MONTH)
    GROUP BY commentLikes.userId, comments.commentId, commentLikes.likeId
    LIMIT ${+itemsPerPage} OFFSET ${offset};
 `;
    return db.execute(sql, [userId, userId]);
  }

  getCommentLikesNotificationsCount(userId) {
    let sql = ` SELECT 
    COUNT(*) as commentLikesCount
    FROM commentLikes 
    LEFT JOIN comments ON commentLikes.commentId = comments.commentId
    LEFT JOIN users ON commentLikes.userId = users.userId
    LEFT JOIN posts ON comments.postId = posts.postId
    WHERE comments.userId = ? AND commentLikes.userId IS NOT NULL AND commentLikes.userId != ? AND commentLikes.likeId IN 
    (
        SELECT MAX(likeId)
        FROM commentLikes
        WHERE commentId = comments.commentId
        GROUP BY commentId
    )
    AND commentLikes.createdAt >= DATE_ADD(CURDATE(), INTERVAL -3 MONTH)`;
    return db.execute(sql, [userId, userId]);
  }

  getFollowingNotifications(userId, offset) {
    let sql = `
    SELECT 
    'followers' AS type,
    users.username,
    followers.createdAt,
    users.userImgURL, 
    (SELECT COUNT(*) - 1 FROM followers WHERE followers.followingId = 
    ${userId}) AS others
    FROM followers
    LEFT JOIN users ON followers.followerId = users.userId
    WHERE followers.followingId = ? 
    GROUP BY followers.followId
    ORDER BY followers.followId DESC
    LIMIT ${1} OFFSET ${offset};
`;
    return db.execute(sql, [userId]);
  }
};
