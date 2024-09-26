const jwt = require("jsonwebtoken");

exports.cookieJwtAuth = (req, res, next) => {
  try {
    if (req.method === "POST") {
      const token = req.cookies.authToken;
      if (!token) {
        return res.status(403).json({ message: "You are not authorized" });
      }
      const user = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
      req.user = user;
    }
    next();
  } catch (err) {
    res.clearCookie("authToken");
    return res.status(403).json({ message: "You are not authorized" });
  }
};
