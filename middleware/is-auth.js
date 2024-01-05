const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({
      error: { code: 401, message: "User not authenticated" },
    });
  }

  const tokenWithoutBearer = token.replace("Bearer ", "");

  if (tokenWithoutBearer) {
    try {
      const validToken = jwt.verify(
        tokenWithoutBearer,
        "somesupersecretsecret"
      );
      if (validToken) {
        req.userLoggedIn = validToken.userId;
        return next();
      }
    } catch (err) {
      err.code = 401;
      return res.json({ error: err });
    }
  } else {
    return res.json({
      error: { code: 401, message: "User not authenticated" },
    });
  }
};
