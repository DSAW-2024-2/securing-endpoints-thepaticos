const productsModel = require("../models/products");
const {isValidResBody} = require('../data/products');

class productsControllers {
  static getAll(req, res) {
    try {
      const products = productsModel.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static createProduct(req, res) {
    try {
      const newProductData = req.body;
      if (!isValidResBody(newProductData)){
        throw new Error("Invalid Body Format")
      }
      const newProduct = productsModel.createProduct(newProductData);
      res.status(201).json(newProduct);
    } catch (error) {
      if ((error.message == "existProduct")) {
        return res.status(409).json({ message: "Product id already exist" });
      } else if ((error.message == "Invalid product id")) {
        return res.status(400).json({ message: "Product id must be a number" });
      } else if ((error.message == "Invalid Body Format")) {
        return res.status(400).json({ message: "Not valid product info in body req" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)){
        throw new Error("Invalid product id");
      }
      const product = productsModel.getById(id);
      res.status(200).json(product);
    } catch (error) {
      if ((error.message == "Product does not exists")) {
        return res.status(404).json({ message: "Product doesn't exists" });
      } else if ((error.message == "Invalid Product id")) {
        return res.status(400).json({ message: "Product id must be a number" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static modifyProduct(req, res) {
    try {
      const id = parseInt(req.params.id,10);
      if (isNaN(id)){
        throw new Error("numId");
      }
      if (!isValidResBody(req.body)){
        throw new Error("Invalid Body Format")
      }
      const modifyProduct = productsModel.modifyProduct(id, req.body);
      res.status(200).json(modifyProduct);
    } catch (error) {
      if ((error.message == "Product doesn't exist")) {
        return res.status(404).json({ message: "Product doesn't exist" });
      } else if ((error.message == "numId")) {
        return res.status(400).json({ message: "Product id must be a number" });
      } else if ((error.message == "Invalid Body Format")) {
        return res.status(400).json({ message: "Not valid product info in body req" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static deleteProduct(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)){
        throw new Error("numId");
      }
      productsModel.deleteProduct(id);
      res.status(204).json();
    } catch (error) {
      if ((error.message == "Product doesn't exist")) {
        return res.status(404).json({ message: "Product doesn't exist" });
      } else if ((error.message == "numId")) {
        return res.status(400).json({ message: "Product id must be a number" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = productsControllers;
