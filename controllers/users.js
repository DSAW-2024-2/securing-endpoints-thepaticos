const usersModel = require("../models/users");
const {isValidResBody} = require('../data/users');
const { message } = require("statuses");

class usersControllers {
  static getAll(req, res) {
    try {
      const users = usersModel.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static createUser(req, res) {
    try {
      const newUserData = req.body;
      if (!isValidResBody(newUserData)){
        throw new Error("Invalid Body Format")
      }
      const newUser = usersModel.createUser(newUserData);
      res.status(201).json(newUser);
    } catch (error) {
      if ((error.message == "existUser")) {
        return res.status(409).json({ message: "User id already exist" });
      } else if ((error.message == "Invalid user id")) {
        return res.status(400).json({ message: "User id must be a number" });
      } else if ((error.message == "Invalid Body Format")) {
        return res.status(400).json({ message: "Not valid user info in body req" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)){
        throw new Error("Invalid user id");
      }
      const user = usersModel.getById(id);
      res.status(200).json(user);
    } catch (error) {
      if ((error.message == "User does not exists")) {
        return res.status(404).json({ message: "User doesn't exists" });
      } else if ((error.message == "Invalid user id")) {
        return res.status(400).json({ message: "User id must be a number" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static modifyUser(req, res) {
    try {
      const id = parseInt(req.params.id,10);
      if (isNaN(id)){
        throw new Error("numId");
      }
      if (!isValidResBody(req.body)){
        throw new Error("Invalid Body Format")
      }
      const modifyUser = usersModel.modifyUser(id, req.body);
      res.status(200).json(modifyUser);
    } catch (error) {
      if ((error.message == "User doesn't exist")) {
        return res.status(404).json({ message: "User doesn't exist" });
      } else if ((error.message == "numId")) {
        return res.status(400).json({ message: "User id must be a number" });
      } else if ((error.message == "Invalid Body Format")) {
        return res.status(400).json({ message: "Not valid user info in body req" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static deleteUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)){
        throw new Error("numId");
      }
      usersModel.deleteUser(id);
      res.status(204).json();
    } catch (error) {
      if ((error.message == "User doesn't exist")) {
        return res.status(404).json({ message: "User doesn't exist" });
      } else if ((error.message == "numId")) {
        return res.status(400).json({ message: "User id must be a number" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = usersControllers;
