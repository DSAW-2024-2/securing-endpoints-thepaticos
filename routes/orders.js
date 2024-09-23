const express = require("express");
const ordersControllers  = require("../controllers/orders");
const router = express.Router();

router.get("/", ordersControllers.getAll);

router.post("/", ordersControllers.createOrder);

router.get("/:id?", ordersControllers.getById);

router.put("/:id", ordersControllers.modifyOrder);

router.delete("/:id", ordersControllers.deleteOrder);

module.exports = router;