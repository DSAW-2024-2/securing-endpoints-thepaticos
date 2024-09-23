const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Load routes from your existing Express app
const productRoutes = require('../routes/products');
app.use(express.json());
app.use('/products', productRoutes);

// Export the handler for Netlify
module.exports.handler = serverless(app);
