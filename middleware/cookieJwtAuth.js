const jwt = require("jsonwebtoken");
const cookie = require("cookie");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

exports.cookieJwtAuth = async (event, context) => {
  const { headers } = event;

  try {
    // Check for all non-GET requests
    if (event.httpMethod !== "GET") {
      // Parse cookies from headers
      const cookies = cookie.parse(headers.cookie || '');
      const token = cookies.authToken;

      // If no token is found, block the request
      if (!token) {
        return {
          statusCode: 403,
          body: JSON.stringify({ message: "You are not authorized. No token provided." })
        };
      }

      // Verify the token
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      context.user = user; // Attach user to context if needed
    }

    // Proceed with your logic for the endpoint
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Request is authorized" })
    };

  } catch (err) {
    // If token verification fails, handle errors
    const clearCookie = {
      statusCode: 403,
      headers: {
        "Set-Cookie": "authToken=; HttpOnly; Path=/; Max-Age=0", // Clear the cookie
      },
      body: JSON.stringify({ message: "You are not authorized." }),
    };

    return clearCookie; // Return the response to clear the cookie
  }
};
