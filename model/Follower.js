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
    WHERE subFollowers.followerId = ${data.userLoggedIn}
      AND subFollowers.followingId = followers.followingId
  ) THEN 1 ELSE 0 END AS followedByUser
    FROM followers
    INNER JOIN users ON users.userId = followers.followingId
    WHERE followers.followerId = ${data.identifier}
    ${data.value ? `AND users.username LIKE '${data.value}%'` : ""}
    ORDER BY followers.followId DESC
    LIMIT ${+data.pageSize} OFFSET ${data.offset};
    `;
    return this.db.execute(sql);
  };

  getUserFollowersCount = (data) => {
    let sql = `SELECT COUNT(*) 
    FROM followers
    INNER JOIN users  ON users.userId = followers.followingId
  WHERE followers.followerId = ${data.identifier}
  ${data.value ? `AND users.username LIKE '${data.value}%'` : ""}
    `;
    return this.db.execute(sql);
  };
};
