const express = require("express");
const authControllers = require("../controllers/login");
const router = express.Router();

router.post("/", authControllers.login);

module.exports = router;
