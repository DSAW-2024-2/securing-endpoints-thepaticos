const express = require("express");
const usersControllers  = require("../controllers/users");
const router = express.Router();

router.get("/", usersControllers.getAll);

router.post("/", usersControllers.createUser);

router.get("/:id?", usersControllers.getById);

router.put("/:id", usersControllers.modifyUser);

router.delete("/:id", usersControllers.deleteUser);

module.exports = router;
