const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Load routes from your existing Express app
const userRoutes = require('../routes/users');
app.use(express.json());
app.use('/users', userRoutes);

// Export the handler for Netlify
module.exports.handler = serverless(app);
