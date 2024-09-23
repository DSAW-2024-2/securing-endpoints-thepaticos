const orders = require("../data/orders.json");
const fs = require("fs");
const path = require("path");

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
    fs.writeFile(
      path.join(__dirname, "../data/orders.json"),
      JSON.stringify(orders, null, 2),
      (err) => {
        if (err) {
          throw new Error("Server Error");
        }
      }
    );
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
      fs.writeFile(
        path.join(__dirname, "../data/orders.json"),
        JSON.stringify(orders, null, 2),
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      return orders[orderIndex];
    } else {
      throw new Error("Order doesn't exist");
    }
  }

  static deleteOrder(id) {
    const orderIndex = orders.findIndex((order) => order.id === id);
    if (orderIndex !== -1) {
      orders.splice(orderIndex, 1);
      fs.writeFile(
        path.join(__dirname, "../data/orders.json"),
        JSON.stringify(orders, null, 2),
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      return;
    } else {
      throw new Error("Order doesn't exist");
    }
  }
};
