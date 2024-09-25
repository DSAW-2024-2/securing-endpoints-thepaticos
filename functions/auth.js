const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Load routes from your existing Express app
const authRoutes = require('../routes/auth');
app.use(express.json());
app.use('/auth', authRoutes);

// Export the handler for Netlify
module.exports.handler = serverless(app);