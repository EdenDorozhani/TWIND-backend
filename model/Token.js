const db = require("../util/database");
const Model = require("./Model");

module.exports = class Token extends Model {
  tableName = "token";
  primaryKey = "tokenId";
  dbColumns = ["userId", "token", "expireTime"];
};
