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

  getUsersCount(userLoggedIn, value) {
    let sql = `SELECT COUNT(*)
    FROM users
     WHERE users.username LIKE '${value}%'
      AND NOT users.userId = ${userLoggedIn}
      `;
    return db.execute(sql);
  }

  getAllUsers(value, userLoggedIn, pageSize, offset) {
    let sql = `
        SELECT users.*,
        IFNULL(SUM(CASE WHEN followers.followerId = ${userLoggedIn} THEN 1 ELSE 0 END), 0) AS followedByUser
        FROM users 
        LEFT JOIN followers ON users.userId = followers.followingId AND followers.followerId = ${userLoggedIn}
        WHERE users.username LIKE '${value}%' AND NOT users.userId = ${userLoggedIn} 
        GROUP BY users.userId
        LIMIT ${pageSize} OFFSET ${offset};
    `;
    return db.execute(sql);
  }
};
