const authModel = require("../models/login");
const jwt = require("jsonwebtoken");

class authControllers {
  static login(req, res) {
    try {
      const authData = req.body;
      authModel.getAuth(authData);

      // Consider including only necessary data in the token
      const token = jwt.sign({ email: authData.email }, process.env.ACCES_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure in production
      });

      res.status(200).json({ message: "Admin correctly logged in" });
    } catch (error) {
      if (error.message === "Invalid Body Format") { // Use '===' for comparison
        return res.status(400).json({ message: "Invalid credentials format" });
      } else if (error.message === "Invalid email or password") { // Check for specific authentication error
        return res.status(403).json({ message: "Incorrect Admin credentials" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = authControllers;
