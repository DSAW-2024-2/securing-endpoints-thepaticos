const {addOrder, deleteOrder, getOrders, getOrderById, getOrderId, updateOrder} = require('../data/orders');
module.exports = class OrdersModel {
  
  static getAll() {
    return getOrders();
  }

  static createOrder(newOrder) {
    const existOrder = getOrderById(newOrder.id);
    if (existOrder!=false) {
      throw new Error("Order already exists");
    }
    addOrder(newOrder)
    return newOrder;
  }

  static getById(id) {
    if (typeof(id)!=='number'){
      throw new Error("Invalid order id");
    }
    const existOrder = getOrderById(id);
    if (existOrder==false) {
      throw new Error("Order does not exist");
    }
    return existOrder;
  }

  static modifyOrder(id, updatedData) {
    if (typeof(id)!=='number'){
      throw new Error("Invalid order id")
    }
    const existOrder = getOrderById(id);
    if (existOrder==false) {
      throw new Error("Order id does not exist");
    }
    updateOrder(getOrderId(existOrder),updatedData);
    return updatedData;
  }

  static deleteOrder(id) {
    if (typeof(id)!=='number'){
      throw new Error("Invalid order id")
    }
    const existOrder = getOrderById(id);
    if (existOrder==false) {
      throw new Error("Order does not exists");
    }
    deleteOrder(getOrderById(id));
  }
};
