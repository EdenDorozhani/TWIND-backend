const pool = require("../util/database");

class Model {
  db = pool;

  tableName = "";
  primaryKey = "";
  dbColumns = [];

  formatFormData(formData) {
    return this.dbColumns.reduce(
      (acc, curr) => ({ ...acc, [curr]: formData[curr] }),
      {}
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
