const users = [  {
    id: 1,
    name: "Jhojan Jimenez",
    email: "jhojimenez@gmail.com",
    age: 20
  },
  {
    id: 2,
    name: "Nicolas Caceres",
    email: "nicoCacer@gmail.com",
    age: 20
  }
];

function addUser(newUser) {
  users.push(newUser);
}

function deleteUser(user) {
  const index = users.indexOf(user);
  if (index !== -1) {
    users.splice(index, 1);
  }
}

function getUsers() {
  return users;
}

function getUserById(id){
  const user = users.find(item => item.id === id);
  if (!user){
    return false;
  }
  return user;
}

function getUserId(user){
  return users.indexOf(user)
}

function updateUser(index, updatedUser){
  users.splice(index, 1, updatedUser)
}
function isValidResBody(resBody) {
  return (
    typeof resBody === 'object' &&
    resBody !== null &&
    'id' in resBody &&
    'name' in resBody &&
    'email' in resBody &&
    'age' in resBody &&
    typeof resBody.id === 'number' &&
    typeof resBody.name === 'string' &&
    typeof resBody.email === 'string' &&
    typeof resBody.age === 'number'
  );
}

module.exports = {
  users,
  addUser,
  deleteUser,
  getUsers,
  getUserById,
  getUserId,
  updateUser,
  isValidResBody
};
