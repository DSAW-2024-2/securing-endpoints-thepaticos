const ordersModel = require("../models/orders");

class ordersControllers {
  static getAll(req, res) {
    try {
      const orders = ordersModel.getAll();
      res.status(200).json(orders);
    } catch (error) {
      console.log(error);
    }
  }
  static createOrder(req, res) {
    try {
      const newOrderData = req.body;
      const newOrder = ordersModel.createOrder(newOrderData);
      res.status(201).json(newOrder);
      return;
    } catch (error) {
      if ((error.message = "existOrder")) {
        return res.status(409).json({ message: "Order_id already exist" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const order = ordersModel.getById(id);
      return res.status(200).json(order);
    } catch (error) {
      if ((error.message = "Order doesn't exist")) {
        return res.status(404).json({ message: "Order doesn't exist" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static modifyOrder(req, res) {
    try {
      const id = parseInt(req.params.id);
      const modifyOrder = ordersModel.modifyOrder(id, req.body);
      return res.status(202).json(modifyOrder);
    } catch (error) {
      if ((error.message = "Order doesn't exist")) {
        return res.status(404).json({ message: "Order doesn't exist" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static deleteOrder(req, res) {
    try {
      const id = parseInt(req.params.id);
      ordersModel.deleteOrder(id);
      return res
        .status(204)
        .json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      if ((error.message = "Order doesn't exist")) {
        return res.status(404).json({ message: "Order doesn't exist" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
function isNumber(param) {
  return typeof param == "number";
}

module.exports = ordersControllers;
