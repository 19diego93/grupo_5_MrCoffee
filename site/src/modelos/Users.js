const fs = require("fs");
const path = require("path");

const User = {
  fileName: path.join(__dirname, "../data/users.json"),

  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },

  generateId: function () {
    let allUsers = this.findAll();
    let lasUser = allUsers.pop();
    if (lasUser) {
      return lasUser.id + 1;
    }
    return 1;
  },

  findAll: function () {
    return this.getData();
  },

  findByPk: function (id) {
    let allUsers = this.getData();
    let userFound = allUsers.find((oneUser) => oneUser.id == id);
    return userFound;
  },
  findByField: function (field, text) {
    let allUsers = this.getData();
    let userFound = allUsers.find((oneUser) => oneUser[field] == text);
    return userFound;
  },

  create: function (userData) {
    let allUsers = this.findAll();

    allUsers.push(userData);
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
  },

  delete: function (id) {
    let allUsers = this.findAll();
    let finalUsers = allUsers.filter((oneUser) => oneUser.id !== id);
    fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
  },
};

module.exports = User;
