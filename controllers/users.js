const usersModel = require("../models/users");

class usersControllers {
  static getAll(req, res) {
    try {
      const users = usersModel.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }
  static createUser(req, res) {
    try {
      const newUserData = req.body;
      const newUser = usersModel.createUser(newUserData);
      res.status(201).json(newUser);
      return;
    } catch (error) {
      if ((error.message == "existUser")) {
        return res.status(409).json({ message: "User_id already exist" });
      } else if ((error.message == "numId")) {
        return res.status(400).json({ message: "User_id must be a number" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = usersModel.getById(id);
      return res.status(200).json(user);
    } catch (error) {
      if ((error.message == "User doesn't exist")) {
        return res.status(404).json({ message: "User doesn't exist" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static modifyUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (typeof(req.body.id)!=='number'){
        throw new Error("numId");
      }
      const modifyUser = usersModel.modifyUser(id, req.body);
      return res.status(202).json(modifyUser);
    } catch (error) {
      if ((error.message == "User doesn't exist")) {
        return res.status(404).json({ message: "User doesn't exist" });
      } else if ((error.message == "numId")) {
        return res.status(400).json({ message: "new User_id must be a number" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  static deleteUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      usersModel.deleteUser(id);
      return res
        .status(204)
        .json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      if ((error.message == "User doesn't exist")) {
        return res.status(404).json({ message: "User doesn't exist" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
function isNumber(param) {
  return typeof param == "number";
}

module.exports = usersControllers;
