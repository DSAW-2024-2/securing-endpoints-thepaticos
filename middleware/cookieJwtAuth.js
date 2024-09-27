const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.cookieJwtAuth = (req, res, next) => {
  try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token){
        return res.status(401).json({ message: "You are not authorized" });
      } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
      }    
  } catch (err) {
    res.clearCookie("authToken");
    return res.status(403).json({ message: "You are not authorized" });
  }
};