const products = require("../data/products");
const fs = require("fs");
const path = require("path");

module.exports = class productsModel {
  static getAll() {
    return products;
  }

  static createProduct(newProduct) {
    if (typeof(newProduct.id)!=='number'){
      throw new Error("The Order_id must be a number")
    }
    const existProduct = products.find((product) => {
      return product.id === newProduct.id;
    });
    if (existProduct) {
      throw new Error("existProduct");
    }
    products.push(newProduct);
    fs.writeFile(
      path.join(__dirname, "../data/products.json"),
      JSON.stringify(products, null, 2),
      (err) => {
        if (err) {
          throw new Error("Server Error");
        }
      }
    );
    return newProduct;
  }

  static getById(id) {
    if (typeof(id)!=='number'){
      throw new Error("The Order_id must be a number")
    }
    const existProduct = products.find((product) => {
      return product.id === id;
    });
    if (!existProduct) {
      throw new Error("Product doesn't exist");
    }
    return existProduct;
  }

  static modifyProduct(id, updateData) {
    if (typeof(id)!=='number'){
      throw new Error("The Order_id must be a number")
    }
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updateData };
      fs.writeFile(
        path.join(__dirname, "../data/products.json"),
        JSON.stringify(products, null, 2),
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      return products[productIndex];
    } else {
      throw new Error("Product doesn't exist");
    }
  }

  static deleteProduct(id) {
    if (typeof(id)!=='number'){
      throw new Error("The Order_id must be a number")
    }
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      fs.writeFile(
        path.join(__dirname, "../data/products.json"),
        JSON.stringify(products, null, 2),
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      return;
    } else {
      throw new Error("Product doesn't exist");
    }
  }
};
