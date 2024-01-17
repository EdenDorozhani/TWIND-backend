const pool = require("../util/database");

class Model {
  db = pool;

  tableName = "";
  primaryKey = "";
  dbColumns = [];
  foreignKey = "";

  formatFormData(formData) {
    return this.dbColumns.reduce(
      (acc, curr) => ({ ...acc, [curr]: formData[curr] }),
      {}
    );
  }

  getRecord(userLoggedIn, identifier, column = null) {
    return this.db.execute(
      `SELECT * FROM ${this.tableName} WHERE ${
        column ? column : "userId"
      } = ${userLoggedIn} AND ${this.foreignKey} = ${identifier}`
    );
  }

  getCount = (id, field) => {
    let sql;
    if (!id) {
      sql = `SELECT COUNT(*) FROM ${this.tableName}`;
    } else {
      sql = `SELECT COUNT(*) FROM ${this.tableName} WHERE ?? = ${id}`;
    }
    return this.db.query(sql, [field]);
  };

  getPostsData(username, pageSize, offset) {
    let sql = `SELECT posts.*, 
        COUNT(postsLikes.likeId) as likeCount,
        (SELECT COUNT(*)
        FROM comments
        WHERE comments.postId = posts.postId) AS comments
        FROM posts 
        LEFT JOIN users ON posts.creatorId = users.userId
        LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
        ${username ? `WHERE users.username = ?` : ""}
        GROUP BY posts.postId
        ORDER BY posts.createdAt DESC 
        LIMIT ${+pageSize} 
        OFFSET ${+offset}`;
    return this.db.execute(sql, [username]);
  }

  getUsers(id, userLoggedIn, orderBy, pageSize, offset, value) {
    let sql = `
    SELECT followers.*, users.userImgURL, users.username,
    CASE WHEN EXISTS (
    SELECT 1
    FROM followers AS subFollowers
    WHERE subFollowers.followerId = ${userLoggedIn}
      AND subFollowers.followingId = followers.followingId
  ) THEN 1 ELSE 0 END AS followedByUser,
  (
    SELECT COUNT(*)
    FROM followers AS countFollowers
    INNER JOIN users AS countUsers ON countUsers.userId = countFollowers.followingId
   ${
     id
       ? `WHERE countFollowers.followerId = ${id}`
       : `WHERE NOT countFollowers.followingId = ${userLoggedIn}`
   } ${value ? `AND countUsers.username LIKE '${value}%'` : ""}
  ) AS filteredCount
    FROM followers
    INNER JOIN users ON users.userId = followers.followingId
    ${
      id
        ? `WHERE followers.followerId = ${id}`
        : `WHERE NOT followers.followingId = ${userLoggedIn}`
    } ${value ? `AND users.username LIKE '${value}%'` : ""}
    ORDER BY ${orderBy} DESC
    LIMIT ${pageSize} OFFSET ${offset};
    `;
    return this.db.execute(sql);
  }

  getOne = (field, value, callback) => {
    let sql = `SELECT * FROM ${this.tableName} WHERE ?? = ?`;
    return this.db.query(sql, [field, value], callback);
  };

  addData = (obj, callback) => {
    let sql = `INSERT INTO ${this.tableName} SET ?`;
    return this.db.query(sql, obj, callback);
  };

  updateData = (obj, id, callback) => {
    let sql = `UPDATE ${this.tableName} SET ? WHERE ${this.primaryKey} = ?`;
    return this.db.query(sql, [obj, id], callback);
  };

  deleteData = (id, callback) => {
    let sql = `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
    return this.db.query(sql, id, callback);
  };

  getAll = async (field, callback) => {
    let sql = `SELECT * from ${this.tableName} ORDER BY ${field} DESC`;
    return this.db.query(sql, callback);
  };

  getAllByField = async (field, value, order_field, callback) => {
    let sql = `SELECT * from ?? WHERE ?? =?  ORDER BY ?? DESC`;
    return this.db.query(
      sql,
      [this.tableName, field, value, order_field],
      callback
    );
  };
}

module.exports = Model;
