const products = [
  {
    id: 1,
    name: "pizza",
    price: 100,
    category: "Fast food"
  },
  {
    id: 2,
    name: "Hamburger",
    price: 200,
    category: "Fast food"
  }
]

function addProduct(newProduct) {
  products.push(newProduct);
}

function deleteProduct(product) {
const index = products.indexOf(product);
if (index !== -1) {
  products.splice(index, 1);
}
}

function getProducts() {
return products;
}

function getProductById(id){
const product = products.find(item => item.id === id);
if (!product){
  return false;
}
return product;
}

function getProductId(product){
return product.indexOf(product)
}

function updateProduct(index, updatedProduct){
  products.splice(index, 1, updatedProduct)
}

function isValidResBody(resBody) {
return (
  typeof resBody === 'object' &&
  resBody !== null &&
  'id' in resBody &&
  'name' in resBody &&
  'price' in resBody &&
  'category' in resBody &&
  typeof resBody.id === 'number' &&
  typeof resBody.name === 'string' &&
  typeof resBody.email === 'number' &&
  typeof resBody.age === 'string'
);
}

module.exports = {
addProduct,
deleteProduct,
getProducts,
getProductById,
getProductId,
updateProduct,
isValidResBody
};
