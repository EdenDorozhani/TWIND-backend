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

  getPostsData = (data) => {
    let sql = `SELECT posts.*, 
        COUNT(postsLikes.likeId) as likesCount,
        (SELECT COUNT(*)
        FROM comments
        WHERE comments.postId = posts.postId) AS commentsCount
        FROM posts 
        LEFT JOIN users ON posts.creatorId = users.userId
        LEFT JOIN postsLikes ON posts.postId = postsLikes.postId
        ${data.identifier ? `WHERE users.username = ? ` : ""}
        GROUP BY posts.postId
        ORDER BY posts.createdAt DESC 
        LIMIT ${+data.pageSize} 
        OFFSET ${data.offset}`;

    return data.identifier
      ? this.db.execute(sql, [data.identifier])
      : this.db.execute(sql);
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
