const users = require("../data/users.json");
const fs = require("fs");
const path = require("path");

module.exports = class usersModel {
  static getAll() {
    return users;
  }

  static createUser(newUser) {
    if (typeof(newUser.id)!=='number'){
      throw new Error("numId")
    }
      const existUser = users.find((user) => {
        return user.id === newUser.id;
      });
      if (existUser) {
        throw new Error("existUser");
      }
      users.push(newUser);
      fs.writeFile(
        path.join(__dirname, "../data/users.json"),
        JSON.stringify(users, null, 2),
        (err) => {
          if (err) {
            throw new Error("Server Error");
          }
        }
      );
      return newUser;
  }

  static getById(id) {
    if (typeof(id)==='number'){
    const existUser = users.find((user) => {
      return user.id === id;
    });
    if (!existUser) {
      throw new Error("User doesn't exist");
    }
    return existUser;
    } else {
      throw new Error("numId")
    }
  }

  static modifyUser(id, updateData) {
    if (typeof(id)!=='number'){
      throw new Error("numId")
    }
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updateData };
      fs.writeFile(
        path.join(__dirname, "../data/users.json"),
        JSON.stringify(users, null, 2),
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      return users[userIndex];
    } else {
      throw new Error("User doesn't exist");
    }
  }

  static deleteUser(id) {
    if (typeof(id)!=='number'){
      throw new Error("numId")
    }
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      fs.writeFile(
        path.join(__dirname, "../data/users.json"),
        JSON.stringify(users, null, 2),
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      return;
    } else {
      throw new Error("User doesn't exist");
    }
  }
};
