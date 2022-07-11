const User = require('../models/Users');

function adminLogged(req, res, next) {
    res.locals.admin = false;
  let categoria = req.cookies.admin  
    
  if(categoria === "admin") {
        res.locals.admin = true;
    }
  

    next();
    
}
module.exports = adminLogged;

