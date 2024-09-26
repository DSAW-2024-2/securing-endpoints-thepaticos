const express = require('express');
const serverless = require('serverless-http');
const app = express();

const loginRoutes = require('../routes/login');
app.use(express.json());
app.use('/login', loginRoutes);

module.exports.handler = serverless(app);
