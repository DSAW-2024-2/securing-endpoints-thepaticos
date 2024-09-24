const authModel = require("../models/auth");
const jwt = require("jsonwebtoken");

const MY_SECRET = "123hjad8/jhad1/8ajdhsad/";
class authControllers {
  static login(req, res) {
    try {
      const authData = req.body;
      authModel.getAuth(authData);
      const token = jwt.sign(authData, MY_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("authToken", token, {
        httpOnly: true,
      });
      res.status(203).json({ message: "Admin correctly login" });
    } catch (error) {
      if ((error.message = "notAuth")) {
        return res.status(403).json({ message: "Incorrect Admin credentials" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
module.exports = authControllers;
