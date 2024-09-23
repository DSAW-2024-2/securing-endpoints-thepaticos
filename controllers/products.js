const productsModel = require("../models/products");

class productsControllers {
  static getAll(req, res) {
    try {
      const products = productsModel.getAll();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  }
  static createProduct(req, res) {
    try {
      const newProductData = req.body;
      const newProduct = productsModel.createProduct(newProductData);
      res.status(201).json(newProduct);
      return;
    } catch (error) {
      if ((error.message = "existProduct")) {
        return res.status(409).json({ message: "Product_id already exist" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const product = productsModel.getById(id);
      return res.status(200).json(product);
    } catch (error) {
      if ((error.message = "Product doesn't exist")) {
        return res.status(404).json({ message: "Product doesn't exist" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static modifyProduct(req, res) {
    try {
      const id = parseInt(req.params.id);
      const modifyProduct = productsModel.modifyProduct(id, req.body);
      return res.status(202).json(modifyProduct);
    } catch (error) {
      if ((error.message = "Product doesn't exist")) {
        return res.status(404).json({ message: "Product doesn't exist" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static deleteProduct(req, res) {
    try {
      const id = parseInt(req.params.id);
      productsModel.deleteProduct(id);
      return res
        .status(204)
        .json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      if ((error.message = "Product doesn't exist")) {
        return res.status(404).json({ message: "Product doesn't exist" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
function isNumber(param) {
  return typeof param == "number";
}

module.exports = productsControllers;
