const express = require("express");
const productsControllers  = require("../controllers/products");
const router = express.Router();

router.get("/", productsControllers.getAll);

router.post("/", productsControllers.createProduct);

router.get("/:id?", productsControllers.getById);

router.put("/:id", productsControllers.modifyProduct);

router.delete("/:id", productsControllers.deleteProduct);

module.exports = router;