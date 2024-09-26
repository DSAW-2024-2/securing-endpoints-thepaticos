const ordersModel = require("../models/orders");
const {isValidResBody} = require('../data/orders');
const {getUserById} = require('../data/users');
const {getProductById} = require('../data/products');
class ordersControllers {
  static getAll(req, res) {
    try {
      const orders = ordersModel.getAll();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static createOrder(req, res) {
    try {
      const newOrderData = req.body;
      if (!isValidResBody(newOrderData)){
        throw new Error("Invalid Body Format")
      }
      if (getUserById(req.body.userId)===false){
        throw new Error("User id does not exist")
      } else if (getProductById(req.body.productId)){
        throw new Error("Product id does not exist")
      }
      const newOrder = ordersModel.createOrder(newOrderData);
      res.status(201).json(newOrder);
    } catch (error) {
      if ((error.message == "existOrder")) {
        return res.status(400).json({ message: "Order id already exist" });
      } else if ((error.message == "Invalid Order id")) {
        return res.status(400).json({ message: "Order id must be a number" });
      } else if ((error.message == "Invalid Body Format")) {
        return res.status(400).json({ message: "Not valid Order info in body req" });
      } else if ((error.message == "Product id does not exist")) {
        return res.status(404).json({ message: "Product id not found" });
      } else if ((error.message == "User id does not exist")) {
        return res.status(404).json({ message: "User id not found" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)){
        throw new Error("Invalid Order id");
      }
      const Order = ordersModel.getById(id);
      res.status(200).json(Order);
    } catch (error) {
      if ((error.message == "Order does not exists")) {
        return res.status(404).json({ message: "Order doesn't exists" });
      } else if ((error.message == "Invalid Order id")) {
        return res.status(400).json({ message: "Order id must be a number" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static modifyOrder(req, res) {
    try {
      const id = parseInt(req.params.id,10);
      if (isNaN(id)){
        throw new Error("numId");
      }
      if (!isValidResBody(req.body)){
        throw new Error("Invalid Body Format")
      }
      if (getUserById(req.body.userId)===false){
        throw new Error("User id does not exist")
      } else if (getProductById(req.body.productId)){
        throw new Error("Product id does not exist")
      }
      const modifyOrder = ordersModel.modifyOrder(id, req.body);
      res.status(200).json(modifyOrder);
    } catch (error) {
      if ((error.message == "Order doesn't exist")) {
        return res.status(404).json({ message: "Order doesn't exist" });
      } else if ((error.message == "numId")) {
        return res.status(400).json({ message: "Order id must be a number" });
      } else if ((error.message == "Invalid Body Format")) {
        return res.status(400).json({ message: "Not valid Order info in body req" });
      } else if ((error.message == "Product id does not exist")) {
        return res.status(404).json({ message: "Product id not found" });
      } else if ((error.message == "User id does not exist")) {
        return res.status(404).json({ message: "User id not found" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static deleteOrder(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)){
        throw new Error("numId");
      }
      ordersModel.deleteOrder(id);
      res.status(204).json();
    } catch (error) {
      if ((error.message == "Order doesn't exist")) {
        return res.status(404).json({ message: "Order doesn't exist" });
      } else if ((error.message == "numId")) {
        return res.status(400).json({ message: "Order id must be a number" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ordersControllers;
