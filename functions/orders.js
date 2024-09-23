const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Load routes from your existing Express app
const orderRoutes = require('../routes/orders');
app.use(express.json());
app.use('/orders', orderRoutes);

// Export the handler for Netlify
module.exports.handler = serverless(app);
