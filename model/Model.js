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

  getCount = (data) => {
    const identifier = data.countIdentifier
      ? data.countIdentifier
      : data.identifier;
    let sql = `SELECT COUNT(*) FROM ${this.tableName} ${
      identifier ? `WHERE ?? = ?` : ""
    }`;
    return this.db.query(sql, [data.field, identifier]);
  };

  getTheLatestRecord = (key) => {
    let sql = `SELECT ${key}
    FROM ${this.tableName}
    ORDER BY ${key} DESC
    LIMIT 1;`;

    return this.db.execute(sql);
  };

  getPostsData = (data) => {
    let sql = `
      SELECT posts.*, 
             COUNT(postsLikes.likeId) as likesCount,
             (SELECT COUNT(*)
              FROM comments
              WHERE comments.postId = posts.postId) AS commentsCount
      FROM posts 
      LEFT JOIN users ON posts.creatorId = users.userId
      LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
      WHERE posts.postId < ? ${data.identifier ? "AND users.username = ?" : ""}
      GROUP BY posts.postId
      ORDER BY posts.createdAt DESC 
      LIMIT ?`;

    let values = [
      !!data.lastElementId ? data.lastElementId : data.latestRecordId,
      !!data.identifier ? data.identifier : null,
      data.pageSize,
    ];

    values = values.filter((value) => value !== null);

    return this.db.execute(sql, values);
  };

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
}

module.exports = Model;
