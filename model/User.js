const Model = require("./Model");

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
};
