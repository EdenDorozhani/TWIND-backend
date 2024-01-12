const Profile = require("./Profile");

module.exports = class Follower extends Profile {
  tableName = "followers";
  primaryKey = "followId";
  dbColumns = ["followerId", "followingId"];
  foreignKey = "followingId";
};
