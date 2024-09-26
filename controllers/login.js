const authModel = require("../models/login");
const jwt = require("jsonwebtoken");

class authControllers {
  static login(req, res) {
    try {
      const authData = req.body;
      authModel.getAuth(authData);
      const token = jwt.sign(authData, process.env.ACCES_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("authToken", token, {
        httpOnly: true,
      });
      res.status(200).json({ message: "Admin correctly login" });
    } catch (error) {
      if ((error.message = "notAuth")) {
        return res.status(403).json({ message: "Incorrect Admin credentials" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
module.exports = authControllers;
