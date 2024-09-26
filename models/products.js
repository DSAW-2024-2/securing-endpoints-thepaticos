const {addProduct, deleteProduct, getProducts, getProductById, getProductId, updateProduct} = require('../data/products');
module.exports = class usersModel {
  
  static getAll() {
    return getProducts();
  }

  static createProduct(newProduct) {
    const existProduct = getProductById(newProduct.id);
    if (existProduct!=false) {
      throw new Error("Product already exists");
    }
    addProduct(newProduct)
    return newProduct;
  }

  static getById(id) {
    if (typeof(id)!=='number'){
      throw new Error("Invalid user id");
    }
    const existProduct = getProductById(id);
    if (existProduct==false) {
      throw new Error("Product does not exist");
    }
    return existProduct;
  }

  static modifyProduct(id, updatedData) {
    if (typeof(id)!=='number'){
      throw new Error("Invalid product id")
    }
    const existProduct = getProductById(id);
    if (existProduct==false) {
      throw new Error("Product id does not exist");
    }
    updateProduct(getProductId(existProduct),updatedData);
    return updatedData;
  }

  static deleteProduct(id) {
    if (typeof(id)!=='number'){
      throw new Error("Invalid product id")
    }
    const existProduct = getProductById(id);
    if (existProduct==false) {
      throw new Error("Product does not exists");
    }
    deleteProduct(getProductById(id));
  }
};
