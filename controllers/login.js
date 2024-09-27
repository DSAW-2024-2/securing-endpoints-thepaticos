const authModel = require("../models/login");
const jwt = require("jsonwebtoken");
require('dotenv').config();

class authControllers {
  static login(req, res) {
    try {
      const authData = req.body;
      authModel.getAuth(authData);

      const token = jwt.sign({ email: authData.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("authToken", token, {
        httpOnly: true
      });

      res.status(200).json({ message: "Admin correctly logged in" });
    } catch (error) {
      if (error.message === "Invalid Body Format") { 
        return res.status(400).json({ message: "Invalid credentials format" });
      } else if (error.message === "Invalid email or password") { 
        return res.status(403).json({ message: "Incorrect Admin credentials" });
      }
      return res.status(500).json({ message: error.message});
    }
  }
}

module.exports = authControllers;
