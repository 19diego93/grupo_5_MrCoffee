const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const User = require('../models/Users')

function adminLogged(req, res, next) {
    res.locals.admin = false;
  let categoria = req.cookies.admin  
    
  if(categoria === "admin") {
        res.locals.admin = true;
    }
  

    next();
    
}
module.exports = adminLogged;

