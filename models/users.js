const initialUsers = require("../data/users.json");
const fs = require("fs");
const path = require("path");
const users = initialUsers;

module.exports = class usersModel {
  static getAll() {
    return users;
  }

  static createUser(newUser) {
    const existUser = users.find((user) => {
      return user.id === newUser.id;
    });
    if (existUser) {
      throw new Error("existUser");
    }
    users.push(newUser);
    return newUser;
  }

  static getById(id) {
    const existUser = users.find((user) => {
      return user.id === id;
    });
    if (!existUser) {
      throw new Error("User doesn't exist");
    }
    return existUser;
  }

  static modifyUser(id, updateData) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updateData };

      return users[userIndex];
    } else {
      throw new Error("User doesn't exist");
    }
  }

  static deleteUser(id) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return;
    } else {
      throw new Error("User doesn't exist");
    }
  }
};
