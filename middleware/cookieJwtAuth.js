const jwt = require("jsonwebtoken");
const MY_SECRET = "123hjad8/jhad1/8ajdhsad/";
exports.cookieJwtAuth = (req, res, next) => {
  try {
    if (req.method !== "GET") {
      const token = req.cookies.authToken;
      const user = jwt.verify(token, MY_SECRET);
      req.user = user;
    }
    next();
  } catch (err) {
    res.clearCookie("authToken");
    return res.status(403).json({ message: "You are not auth" });
  }
};
