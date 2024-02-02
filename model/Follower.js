const Model = require("./Model");

module.exports = class Follower extends Model {
  tableName = "followers";
  primaryKey = "followId";
  dbColumns = ["followerId", "followingId", "createdAt"];
  foreignKey = "followingId";

  getUserFollowers = (data) => {
    let sql = `
    SELECT followers.*, users.userImgURL, users.username,
    CASE WHEN EXISTS (
    SELECT 1
    FROM followers AS subFollowers
    WHERE subFollowers.followerId = ?
      AND subFollowers.followingId = followers.followingId
  ) THEN 1 ELSE 0 END AS followedByUser
    FROM followers
    INNER JOIN users ON users.userId = followers.followingId
    WHERE followers.followerId = ?
    ${data.value ? `AND users.username LIKE '%${data.value}%'` : ""}
    ORDER BY ${
      data.value ? `users.username LIKE '${data.value}%'` : `followers.followId`
    } DESC 
    LIMIT ? OFFSET ${data.offset};
    `;

    let values = [data.userLoggedIn, data.identifier, data.pageSize];

    return this.db.execute(sql, values);
  };

  getUserFollowersCount = (data) => {
    let sql = `SELECT COUNT(*) 
    FROM followers
    INNER JOIN users ON users.userId = followers.followingId
    WHERE followers.followerId = ?`;

    const values = [data.identifier];

    if (data.value) {
      sql += ` AND users.username LIKE ?`;
      values.push(`%${data.value}%`);
    }
    return this.db.execute(sql, values);
  };
};
