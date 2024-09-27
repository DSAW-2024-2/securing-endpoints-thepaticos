const authModel = require("../models/login");
const jwt = require("jsonwebtoken");
require('dotenv').config();

class authControllers {
  // Login function to generate JWT token
  static login(req, res) {
    try {
      const authData = req.body;

      // Simulate getting user data from the model (replace with actual logic)
      const user = authModel.getAuth(authData);

      if (!user) {
        return res.status(403).json({ message: "Incorrect Admin credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { email: authData.email }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: "1h" }
      );

      // Send Bearer token in response
      res.status(200).json({
        message: "Admin correctly logged in",
        token: `Bearer ${token}`, // Return token in Bearer format
      });
    } catch (error) {
      if (error.message === "Invalid Body Format") {
        return res.status(400).json({ message: "Invalid credentials format" });
      } else if (error.message === "Invalid email or password") {
        return res.status(403).json({ message: "Incorrect Admin credentials" });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  // Middleware to authenticate token
  static authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

    if (token == null) return res.sendStatus(401); // No token provided

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Invalid token

      req.user = user; // Attach user to the request object
      next(); // Proceed to the next middleware or route handler
    });
  }
}

module.exports = authControllers;
