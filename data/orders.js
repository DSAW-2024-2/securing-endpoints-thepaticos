const orders = 
  [
    {
      id: 1,
      userId: 2,
      productId: 1,
      quantity: 10,
      status: "On delivery"
    },
    {
      id: 2,
      userId: 1,
      productId: 2,
      quantity: 5,
      status: "Delivered"
    }
  ]

function addOrder(newOrder) {
orders.push(newOrder);
}

function deleteOrder(order) {
const index = orders.indexOf(order);
if (index !== -1) {
  orders.splice(index, 1);
}
}

function getOrders() {
return orders;
}

function getOrderById(id){
const order = orders.find(item => item.id === id);
if (!order){
  return false;
}
return order;
}

function getOrderId(order){
return orders.indexOf(order)
}

function updateOrder(index, updatedOrder){
orders.splice(index, 1, updatedOrder)
}

function isValidResBody(resBody) {
  return (
    typeof resBody === 'object' &&
    resBody !== null &&
    'id' in resBody &&
    'userId' in resBody &&
    'productId' in resBody &&
    'quantity' in resBody &&
    'status' in resBody &&
    typeof resBody.id === 'number' &&
    typeof resBody.userId === 'number' &&
    typeof resBody.productId === 'number' &&
    typeof resBody.quantity === 'number' &&
    typeof resBody.status === 'string'
  );
}

module.exports = {
addOrder,
deleteOrder,
getOrders,
getOrderById,
getOrderId,
updateOrder,
isValidResBody
};
