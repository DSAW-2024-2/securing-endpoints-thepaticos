const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

exports.cookieJwtAuth = (req, res, next) => {
  try {
    if (req.method !== "GET") {
      const token = req.cookies.authToken;
      if (!token) {
        return res.status(403).json({ message: "You are not authorized" });
      }
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = user;
    }
    next();
  } catch (err) {
    res.clearCookie("authToken");
    return res.status(403).json({ message: "You are not authorized" });
  }
};