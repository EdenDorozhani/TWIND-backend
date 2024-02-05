const jwt = require("jsonwebtoken");
const Response = require("../model/Response");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send(new Response(false, "User not authenticated"));
  }
  const tokenWithoutBearer = token.replace("Bearer ", "");
  try {
    const validToken = jwt.verify(tokenWithoutBearer, "somesupersecretsecret");
    if (validToken) {
      req.userLoggedIn = validToken.userId;
      return next();
    }
  } catch (err) {
    return res.status(401).send(new Response(false, "Invalid Token"));
  }
};
