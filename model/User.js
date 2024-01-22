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
        SELECT users.*,
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
        GROUP BY users.userId
        LIMIT ${+data.pageSize} OFFSET ${data.offset};
    `;
    return db.execute(sql);
  }
};
