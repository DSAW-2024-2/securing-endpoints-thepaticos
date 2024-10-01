const initialOrders = require("../data/orders.json");
const fs = require("fs");
const path = require("path");
const orders = initialOrders;
module.exports = class ordersModel {
  static getAll() {
    return orders;
  }

  static createOrder(newOrder) {
    const existOrder = orders.find((order) => {
      return order.id === newOrder.id;
    });
    if (existOrder) {
      throw new Error("existOrder");
    }
    orders.push(newOrder);
    return newOrder;
  }

  static getById(id) {
    const existOrder = orders.find((order) => {
      return order.id === id;
    });
    if (!existOrder) {
      throw new Error("Order doesn't exist");
    }
    return existOrder;
  }

  static modifyOrder(id, updateData) {
    const orderIndex = orders.findIndex((order) => order.id === id);
    if (orderIndex !== -1) {
      orders[orderIndex] = { ...orders[orderIndex], ...updateData };
      return orders[orderIndex];
    } else {
      throw new Error("Order doesn't exist");
    }
  }

  static deleteOrder(id) {
    const orderIndex = orders.findIndex((order) => order.id === id);
    if (orderIndex !== -1) {
      orders.splice(orderIndex, 1);
      return;
    } else {
      throw new Error("Order doesn't exist");
    }
  }
};
