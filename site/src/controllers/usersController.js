//! Extensiones
const fs = require("fs");
const path = require("path");

//! Archivos
const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

//! Controlador
const usersController = {
  login: (req, res) => {
    res.render("users/login");
  },
  register: (req, res) => {
    res.render("users/register");
  },
  profile: (req, res) => {
    res.render("users/profile");
  },
};

module.exports = usersController;
