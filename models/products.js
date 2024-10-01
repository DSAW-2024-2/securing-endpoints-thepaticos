const initialProducts = require("../data/products.json");
const fs = require("fs");
const path = require("path");
const products = initialProducts;
module.exports = class productsModel {
  static getAll() {
    return products;
  }

  static createProduct(newProduct) {
    const existProduct = products.find((product) => {
      return product.id === newProduct.id;
    });
    if (existProduct) {
      throw new Error("existProduct");
    }
    products.push(newProduct);

    return newProduct;
  }

  static getById(id) {
    const existProduct = products.find((product) => {
      return product.id === id;
    });
    if (!existProduct) {
      throw new Error("Product doesn't exist");
    }
    return existProduct;
  }

  static modifyProduct(id, updateData) {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updateData };

      return products[productIndex];
    } else {
      throw new Error("Product doesn't exist");
    }
  }

  static deleteProduct(id) {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      return;
    } else {
      throw new Error("Product doesn't exist");
    }
  }
};
