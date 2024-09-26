const {addUser, deleteUser, getUsers, getUserById, getUserId, updateUser} = require('../data/users');
const { message } = require("statuses");

module.exports = class usersModel {
  
  static getAll() {
    return getUsers();
  }

  static createUser(newUser) {
    const existUser = getUserById(newUser.id);
    if (existUser!=false) {
      throw new Error("User already exists");
    }
    addUser(newUser)
    return newUser;
  }

  static getById(id) {
    if (typeof(id)!=='number'){
      throw new Error("Invalid user id");
    }
    const existUser = getUserById(id);
    if (existUser==false) {
      throw new Error("User does not exist");
    }
    return existUser;
  }

  static modifyUser(id, updatedData) {
    if (typeof(id)!=='number'){
      throw new Error("Invalid user id")
    }
    const existUser = getUserById(id);
    if (existUser==false) {
      throw new Error("User id does not exist");
    }
    updateUser(getUserId(existUser),updatedData);
    return updatedData;
  }

  static deleteUser(id) {
    if (typeof(id)!=='number'){
      throw new Error("Invalid user id")
    }
    const existUser = getUserById(id);
    if (existUser==false) {
      throw new Error("User does not exists");
    }
    deleteUser(getUserById(id));
  }
};
