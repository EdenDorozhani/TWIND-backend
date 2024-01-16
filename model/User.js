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

  findUserByUsername(username) {
    return this.getOne("username", username);
  }

  findUserByEmail(email) {
    return this.getOne("email", email);
  }

  getAllUsers(value, userLoggedIn, pageSize, offset) {
    let sql = `SELECT users.*,
    IFNULL(SUM(CASE WHEN followers.followerId = ${userLoggedIn} THEN 1 ELSE 0 END), 0) AS followedByUser
    FROM users 
    LEFT JOIN followers ON users.userId = followers.followingId 
    WHERE users.username LIKE '${value}%' AND NOT followers.followingId = ${userLoggedIn} 
    GROUP BY users.userId
    LIMIT ${pageSize} OFFSET ${offset};
    `;
    return db.execute(sql);
  }
};
